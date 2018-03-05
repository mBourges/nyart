const functions = require('firebase-functions');
const elastic = require('./lib/elastic');
const { transformPhones, transformEmails, removeRef } = require('./lib/transform');

const onCompanyCreatedIndex = functions.firestore
  .document('Company/{companyId}')
  .onCreate(event => {
    const original = event.data.data();
    const id = event.params.companyId;
    const recordToIndex = Object.assign({}, original, {
      Phones: transformPhones(original.Phones),
      Emails: transformEmails(original.Emails),
      Recruiter: removeRef(original.Recruiter)
    });

    return elastic.indexRecord('companies', 'doc', id, recordToIndex);
  });

const onCompanyupdatedIndex = functions.firestore
  .document('Company/{companyId}')
  .onUpdate(event => {
    const original = event.data.data();
    const id = event.params.companyId;
    const recordToIndex = Object.assign({}, original, {
      Phones: transformPhones(original.Phones),
      Emails: transformEmails(original.Emails),
      Recruiter: removeRef(original.Recruiter)
    });

    return elastic.indexRecord('companies', 'doc', id, recordToIndex);
  });

const onCompanyDeletedIndex = functions.firestore
  .document('Company/{companyId}')
  .onDelete(event => {
    const id = event.params.companyId;

    return elastic.deleteRecord('companies', 'doc', id);
  });

module.exports = {
  onCompanyCreatedIndex,
  onCompanyupdatedIndex,
  onCompanyDeletedIndex
};

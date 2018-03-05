const functions = require('firebase-functions');
const elastic = require('./lib/elastic');
const { transformPhones, transformEmails, removeRef } = require('./lib/transform');

const onClientContactCreatedIndex = functions.firestore
  .document('ClientContact/{clientContactId}')
  .onCreate(event => {
    const original = event.data.data();
    const id = event.params.clientContactId;
    const recordToIndex = Object.assign({}, original, {
      Phones: transformPhones(original.Phones),
      Emails: transformEmails(original.Emails),
      Company: removeRef(original.Company),
      Recruiter: removeRef(original.Recruiter),
      Type: 'client contact'
    });

    return elastic.indexRecord('contacts', 'doc', id, recordToIndex);
  });

const onClientContactUpdatedIndex = functions.firestore
  .document('ClientContact/{clientContactId}')
  .onUpdate(event => {
    const original = event.data.data();
    const id = event.params.clientContactId;
    const recordToIndex = Object.assign({}, original, {
      Phones: transformPhones(original.Phones),
      Emails: transformEmails(original.Emails),
      Company: removeRef(original.Company),
      Recruiter: removeRef(original.Recruiter),
      Type: 'client contact'
    });

    return elastic.indexRecord('contacts', 'doc', id, recordToIndex);
  });

const onClientContactDeletedIndex = functions.firestore
  .document('ClientContact/{clientContactId}')
  .onDelete(event => {
    const id = event.params.clientContactId;

    return elastic.deleteRecord('contacts', 'doc', id);
  });

module.exports = {
  onClientContactCreatedIndex,
  onClientContactUpdatedIndex,
  onClientContactDeletedIndex
};

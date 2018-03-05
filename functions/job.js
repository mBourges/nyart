const functions = require('firebase-functions');
const elastic = require('./lib/elastic');
const { transformPhones, transformEmails, removeRef } = require('./lib/transform');

const onJobCreatedIndex = functions.firestore
  .document('Job/{jobId}')
  .onCreate(event => {
    const original = event.data.data();
    const id = event.params.jobId;
    const recordToIndex = Object.assign({}, original, {
      Company: removeRef(original.Company),
      ClientContact: removeRef(original.ClientContact),
      Recruiter: removeRef(original.Recruiter)
    });

    return elastic.indexRecord('jobs', 'doc', id, recordToIndex);
  });

const onJobupdatedIndex = functions.firestore
  .document('Job/{jobId}')
  .onUpdate(event => {
    const original = event.data.data();
    const id = event.params.jobId;
    const recordToIndex = Object.assign({}, original, {
      Company: removeRef(original.Company),
      ClientContact: removeRef(original.ClientContact),
      Recruiter: removeRef(original.Recruiter)
    });

    return elastic.indexRecord('jobs', 'doc', id, recordToIndex);
  });

const onJobDeletedIndex = functions.firestore
  .document('Job/{jobId}')
  .onDelete(event => {
    const id = event.params.jobId;

    return elastic.deleteRecord('job', 'doc', id);
  });

module.exports = {
  onJobCreatedIndex,
  onJobupdatedIndex,
  onJobDeletedIndex
};

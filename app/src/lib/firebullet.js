import { firestore, storage } from './firebase';

function insertCandidate(record) {
  const { Resumes, ...rest } = record;

  return firestore.collection('Candidate')
    .add(rest)
    .then(doc => doc.id)
    .then(id => insertResumes(id, Resumes));
}

function insertResumes(id, resumes) {
  if (!resumes) {
    return Promise.resolve(id);
  }

  const updloadTasks = resumes.map(resume => insertResume(id, resume));

  return Promise.all(updloadTasks)
    .then(res => id);
}

function insertResume(id, resume) {
  const storageRef = storage.ref('/resumes').child(id);

  return storageRef
    .child(resume.name)
    .put(resume, { contentType: resume.type })
    .then(snapshot => {
      return firestore.collection('Candidate')
        .doc(id)
        .collection('resumes')
        .add({
          Name: resume.name,
          Size: resume.size,
          Type: resume.type,
          Url: snapshot.downloadURL
        });
    });
}

function insertClientContact(record) {
  return firestore.collection('ClientContact')
    .add(record)
    .then(doc => doc.id);
}

function insertCompany(record) {
  return firestore.collection('Company')
    .add(record)
    .then(doc => doc.id);
}

function insertJob(record) {
  return firestore.collection('Job')
    .add(record)
    .then(doc => doc.id);
}

function insertProcess(record) {
  return firestore.collection('Process')
    .add(record)
    .then(doc => doc.id);
}

function insert(type, record) {
  switch (type) {
    case 'candidate':
      return insertCandidate(record);
    case 'clientContact':
      return insertClientContact(record);
    case 'company':
      return insertCompany(record);
    case 'job':
      return insertJob(record);
    case 'process':
      return insertProcess(record);
    default:
  }
}

function generateRef(type, id) {
  return firestore.collection(type).doc(id);
}

function fetch(commit, { type, id }) {
  switch (type) {
    case 'candidate':
      return fetchCandidate(commit, { type, id });
    default:
      return null;
  }
}

function fetchCandidate(commit, { type, id }) {
  const sub = firestore.collection('Candidate')
    .doc(id)
    .onSnapshot(doc => {
      const record = doc.data();

      commit('setRecord', { id, type, record });
    });

  const subResume = firestore.collection('Candidate')
    .doc(id)
    .collection('resumes')
    .onSnapshot(docs => {
      let records = [];

      docs.forEach(querySnapshot => {
        records = [ ...records, querySnapshot.data() ];
      });

      commit('setRelated', { key: 'Resumes', relatedRecords: records });
    });

  return [ sub, subResume ];
}

export default {
  insert,
  generateRef,
  fetch
};

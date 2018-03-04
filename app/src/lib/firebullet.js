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
    default:
  }
}

function generateRef(type, id) {
  return firestore.collection(type).doc(id);
}

export default {
  insert,
  generateRef
};

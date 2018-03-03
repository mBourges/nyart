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

function insert(type, record) {
  switch (type) {
  case 'candidate':
    return insertCandidate(record);
  default:
  }
}

export default {
  insert
};

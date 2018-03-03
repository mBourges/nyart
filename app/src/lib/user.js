import { firestore } from './firebase';

function getUserInfo(uid) {
  return firestore.collection('Users')
    .doc(uid)
    .get()
    .then(extractUser);
}

function extractUser(doc) {
  if (!doc.exists) {
    throw new Error('No User!');
  }

  const user = doc.data();

  return {
    id: doc.id,
    displayName: formatDisplayName(user),
    ...user
  };
}

function formatDisplayName(user) {
  return `${user.Firstname} ${user.Lastname}`;
}

function getUserPermissions(uid) {
  return firestore.collection('Users')
    .doc(uid)
    .collection('Permissions')
    .get()
    .then(extractPermissions);
}

function extractPermissions(querySnapshot) {
  let permissions = [];

  querySnapshot.forEach(doc => {
    const { allow } = doc.data();

    if (allow) {
      permissions = [ ...permissions, doc.id ];
    }
  });

  return permissions;
}

export default function getUserWithPermissions(uid) {
  return Promise.all([
    getUserInfo(uid),
    getUserPermissions(uid)
  ]);
}

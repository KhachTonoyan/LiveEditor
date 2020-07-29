import state from '../State/State.js';

function newRootForJSON(root) {
  function getRoot(root) {
    return change({ ...root });
  }

  function change(object) {
    object.children = { ...object.children };
    const children = forInChildren(object.children);
    for (const key in object.children) {
      if (children[key].type === 'folder') {
        children[key] = { ...children[key] };
        change(children[key]);
      }
    }
    return object;
  }

  function removeCircl(obj) {
    const newObj = { ...obj };
    newObj.parent = obj.parent.name;
    return newObj;
  }

  function forInChildren(children) {
    for (const key in children) {
      children[key] = removeCircl(children[key]);
    }
    return children;
  }
  return getRoot(root);
}

function authHandler(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      state.userID = user.uid;
      return getData(state.userID);
    });
}

async function getData(id) {
  const firebaseRes = await firebase.database();
  const addRef = await firebaseRes.ref(`/data/${id}`);
  const once = await addRef.once('value');
  const val = await once.val();
  if (val) {
    const res = await JSON.parse(val.root);
    return res;
  }
  return '';
}

function parseDataFromSv(data) {
  function getData(data) {
    return change({ ...data });
  }

  function change(object) {
    object.children = { ...object.children };
    const children = forInChildren(object.children, object);
    for (const key in object.children) {
      if (children[key].type === 'folder') {
        children[key] = { ...children[key] };
        change(children[key]);
      }
    }
    return object;
  }

  function addParent(obj, parent) {
    const newObj = { ...obj };
    newObj.parent = parent;
    return newObj;
  }

  function forInChildren(children, parent) {
    for (const key in children) {
      children[key] = addParent(children[key], parent);
    }
    return children;
  }
  return getData(data);
}

export { newRootForJSON, authHandler, parseDataFromSv };

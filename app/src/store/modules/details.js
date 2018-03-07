import { firestore } from '@/lib/firebase';
import firebullet from '@/lib/firebullet';
import { set } from '@/lib/immutable';

const SET_RECORD = 'setRecord';
const SET_RELATED = 'setRelated';
const RESET_RECORD = 'reset';

let subscriptions = [];

const state = {
  isFetching: true,
  isSaving: false,
  type: null,
  id: null,
  record: {},
  related: {},
  original: {}
};

const mutations = {
  [SET_RECORD](state, { id, type, record }) {
    state.type = type;
    state.id = id;
    state.record = record;
    state.original = record;
    state.isFetching = false;
  },
  [SET_RELATED](state, { key, relatedRecords }) {
    state.related = set(state.related, key, relatedRecords);
    console.log(state);
  },
  [RESET_RECORD](state) {
    state.record = state.orginal;
  }
};

const actions = {
  fetch({ commit, state }, { type, id }) {
    state.isFetching = true;

    // const sub = firestore.collection('Candidate')
    //   .doc(id)
    //   .onSnapshot(doc => {
    //     const record = doc.data();

    //     commit(SET_RECORD, { type, record });
    //   });

    subscriptions = firebullet.fetch(commit, { type, id }); // [...subscriptions, sub];
  },
  update({ commit, state }, { fieldpath, value }) {
    state.isSaving = true;
    const { record, type } = state;
    const recordToUpdate = set(record, fieldpath, value);

    return firestore.collection(type)
      .doc(record.id)
      .update(recordToUpdate);
    // .then(() => {
    //   commit(SET_RECORD, { type, recordToUpdate });
    // });
  },
  clear() {
    if (subscriptions) {
      subscriptions.forEach(unsubscribe => unsubscribe());
    }

    state.subscriptions = [];
    state.type = null;
    state.isFetching = true;
    state.record = {};
    state.original = {};
  }
};

const getters = {
  getRelated: (state) => {
    return type => state.related[type];
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

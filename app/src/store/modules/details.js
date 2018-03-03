import { firestore } from '@/lib/firebase';
import { set } from '@/lib/immutable';

const SET_RECORD = 'setRecord';
const RESET_RECORD = 'reset';

let subscriptions = [];

const state = {
  isLoading: true,
  isSaving: false,
  type: null,
  record: {},
  original: {}
};

const mutations = {
  [SET_RECORD](state, { type, record }) {
    state.type = type;
    state.record = record;
    state.original = record;
    state.isLoading = true;
  },
  [RESET_RECORD](state) {
    state.record = state.orginal;
  }
};

const actions = {
  fetch({ commit, state }, { type, id }) {
    state.isLoading = true;

    const sub = firestore.collection('Candidate')
      .doc(id)
      .onSnapshot(doc => {
        const record = doc.data();

        commit(SET_RECORD, { type, record });
      });

    subscriptions = [...subscriptions, sub];
  },
  update({ commit, state }, { fieldpath, value }) {
    state.isSaving = true;
    const { record, type } = state;
    const recordToUpdate = set(record, fieldpath, value);

    return firestore.collection(type)
      .doc(record.id)
      .update(recordToUpdate)
      .then(() => {
        commit(SET_RECORD, { type, recordToUpdate });
      });
  },
  clear() {
    subscriptions
      .forEach(unsubscribe => unsubscribe());

    subscriptions = [];
    state.type = null;
    state.isLoading = true;
    state.record = {};
    state.original = {};
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

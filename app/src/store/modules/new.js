import firebullet from '@/lib/firebullet';
import { set } from '@/lib/immutable';

const TOGGLE_DIALOG = 'toggleDialog';
const UPDATE_TYPE = 'updateType';
const UPDATE_RECORD = 'updateRecord';

const state = {
  isOpen: false,
  isSaving: false,
  type: null,
  record: {}
};

const mutations = {
  [TOGGLE_DIALOG](state, isOpen) {
    state.isOpen = isOpen;

    if (!state.isOpen) {
      state.type = null;
      state.record = {};
    }
  },
  [UPDATE_TYPE](state, type) {
    state.type = type;
    state.record = {};
  },
  [UPDATE_RECORD](state, { name, value }) {
    state.record = set(state.record, name, value);
    console.log(state);
  }
};

const actions = {
  insert({ commit, state }) {
    console.log('INSERT', state.type, state.record);
    return firebullet.insert(state.type, state.record)
      .then(id => {
        const { type } = state;
        const url = `/details/${type}/${id}`;

        commit(TOGGLE_DIALOG, false);

        return url;
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

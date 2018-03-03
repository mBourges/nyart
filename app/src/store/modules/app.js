import { firestore } from '@/lib/firebase';

const TOGGLE_DRAWER = 'toggleDrawer';
const SET_PICKLIST = 'setPicklist';

const state = {
  navDrawer: null,
  picklists: {}
};

const mutations = {
  [TOGGLE_DRAWER](state, isOpen) {
    state.navDrawer = isOpen;
  },
  [SET_PICKLIST](state, { type, values }) {
    state.picklists = Object.assign({}, state.picklists, { [type]: values });
  }
};

const actions = {
  fetchPicklist({ commit }, type) {
    firestore.collection('Picklist')
      .doc(type)
      .get().then(doc => {
        const values = doc.exists ? doc.data().Values : [];

        commit(SET_PICKLIST, { type, values });
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

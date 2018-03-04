import firebullet from '@/lib/firebullet';

const SET_USER = 'setUser';
const CLEAR_USER = 'clearUser';

const state = {
  isAuthorized: false,
  isAdmin: false,
  user: null
};

const mutations = {
  [SET_USER](state, { user, permissions }) {
    state.user = user;
    state.isAuthorized = permissions.includes('authorized');
    state.isAdmin = permissions.includes('administrator');
  },
  [CLEAR_USER](state) {
    state.isAdmin = false;
    state.isAuthorized = false;
    state.user = null;
  }
};

const getters = {
  recruiter: (state) => {
    return {
      Name: state.user && state.user.displayName,
      id: state.user && state.user.id,
      ref: state.user && firebullet.generateRef('Users', state.user.id)
    };
  },
  username: (state) => {
    return state.user && (state.user.displayName || state.user.email);
  }
  // photoUrl: (state) => {
  //   return state.user && (state.user.photoURL || 'https://www.gravatar.com/avatar/' + md5(state.user.email.trim().toLowerCase()));
  // }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};

// import { auth, firestore } from '@/lib/firebase';
import { periods } from '@/lib/date';
import retrieveKPI from '@/lib/kpi';

const UPDATE_PERIOD = 'updatePeriod';
const UPDATE_RECRUITER = 'updateRecruiter';
const SET_STAT = 'setStat';
const CLEAR_STATS = 'clearStats';

const state = {
  isLoading: false,
  period: 'THIS_FQ',
  recruiter: {},
  candidate: null,
  clientContact: null,
  company: null,
  job: null
};

const mutations = {
  [UPDATE_PERIOD](state, period) {
    state.period = period;
  },
  [UPDATE_RECRUITER](state, recruiter) {
    state.recruiter = recruiter;
  },
  [SET_STAT](state, { key, value }) {
    state[key] = value;
  },
  [CLEAR_STATS](state) {
    state.candidate = null;
    state.clientContact = null;
    state.company = null;
    state.job = null;
  }
};

const getters = {
  period: (state) => {
    const { label, value } = periods[state.period];

    return {
      label,
      range: value,
      value: state.period
    };
  },
  stats: (state) => {
    const { candidate, clientContact, company, job } = state;

    return { candidate, clientContact, company, job };
  }
};

const actions = {
  refresh({ commit, state, getters }) {
    state.isLoading = true;

    retrieveKPI(state.recruiter, getters['period'])
      .then(kpi => {
        commit(SET_STAT, { key: 'candidate', value: kpi.candidate || 0 });
        commit(SET_STAT, { key: 'clientContact', value: kpi.clientContact || 0 });
        commit(SET_STAT, { key: 'company', value: kpi.companies || 0 });
        commit(SET_STAT, { key: 'job', value: kpi.jobs || 0 });
        state.isLoading = false;
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};

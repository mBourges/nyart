import Elastic from '@/lib/elastic';

const UPDATE_QUERY = 'updateQuery';
const SET_RESULTS = 'setResults';

const state = {
  query: null,
  isQueryDirty: false,
  results: null,
  resultTotal: null,
  isSearching: false
};

const mutations = {
  [UPDATE_QUERY](state, query) {
    state.query = query;
    state.isQueryDirty = true;
  },
  [SET_RESULTS](state, results) {
    state.results = results;
    state.isSearching = false;
  }
};

const actions = {
  search({ commit, state }) {
    if (!state.isQueryDirty) {
      return;
    }

    state.results = null;
    state.resultTotal = null;
    state.isSearching = true;

    const elastic = new Elastic();

    elastic
      .setIndex('companies,jobs,contacts')
      .size(250)
      .query(state.query)
      .search()
      .then(results => {
        const { hits, total } = results.hits;

        state.isSearching = false;
        state.isQueryDirty = false;
        state.resultTotal = total;
        state.results = hits.map(({_id, _index, _source}) => ({
          id: _id,
          index: _index,
          ..._source
        }));
      })
      .catch(err => {
        console.log(err);
        state.isSearching = false;
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

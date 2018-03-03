import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import kpi from './modules/kpi';
import search from './modules/search';
import newRecord from './modules/new';
import details from './modules/details';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user,
    kpi,
    search,
    newRecord,
    details
  }
});

import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import store from './store';
import { auth } from './lib/firebase';
import getUserWithPermissions from './lib/user';

import 'vuetify/dist/vuetify.min.css';
import 'mdi/css/materialdesignicons.min.css';

Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
});

let app;

auth.onAuthStateChanged(user => {
  if (user) {
    const { uid } = user;
    getUserWithPermissions(uid)
      .then(([user, permissions]) => {
        store.commit('user/setUser', { user, permissions });
        initApp();
      });
  } else {
    store.commit('user/clearUser');
    initApp();
  }
});

function initApp() {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    });
  }
}

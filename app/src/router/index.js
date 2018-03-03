import Vue from 'vue';
import Router from 'vue-router';
// import store from '@/store';
import { auth } from '@/lib/firebase';
import Login from '@/pages/login';
import Shell from '@/components/shell';
import NotFound from '@/pages/notFound';
import Unauthorized from '@/pages/unauthorized';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized
    }, {
      path: '/',
      component: Shell,
      meta: {
        requiresAuth: true
      },
      children: [{
        path: '',
        name: 'Home',
        component: () => import('@/pages/home')
      }, {
        path: 'search',
        name: 'Search',
        component: () => import('@/pages/search')
      }, {
        path: '/details/:type/:id',
        name: 'Details',
        component: () => import('@/pages/details')
      }, {
        path: '*',
        name: 'AppNotFound',
        component: NotFound
      }]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(path => path.meta.requiresAuth);
  // const { isAuthorized } = store.state.user;

  // console.log('isAuthorized', from.fullPath, isAuthorized);

  // if (from.fullPath !== '/unauthorized' && !isAuthorized) {
  //   // console.log('is not Authorized');
  //   // next({ name: 'Login', query: { redirect: to.fullPath } });
  //   // return;
  //   next({ name: 'Unauthorized' });
  // } else
  if (requiresAuth && !currentUser) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;

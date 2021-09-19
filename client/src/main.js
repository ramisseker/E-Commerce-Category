import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import Index from './components/CategoryList.vue';
import Index2 from './components/CategoryList2.vue';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  {
    name: 'Index',
    path: '/',
    component: Index,
  },
  {
    name: 'Index2',
    path: '/Index2',
    component: Index2,
  },
];

const router = new VueRouter({ mode: 'history', routes: routes });

new Vue({
  // init router
  router,
  render: (h) => h(App),
}).$mount('#app');

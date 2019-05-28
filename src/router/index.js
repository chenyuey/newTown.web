import Vue from 'vue';
import Router from 'vue-router';
import parseConfig from '../../config/parseConfig';

const Parse = require('parse');
Parse.initialize(parseConfig.id, parseConfig.key);
Parse.serverURL = parseConfig.url;
import TownMapList from '@/views/townMapList';
import HomeMapList from '@/views/homeMapList';
import AdvertisementList from '@/views/advertisementList.vue';
import Login from '@/views/Login.vue';
import Test from '@/components/layout.vue';

Vue.use(Router);

Vue.prototype.$parse = Parse;
// var AV = require('leancloud-storage');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/townMapList',
      name: 'TownMapList',
      component: TownMapList
    },
    {
      path: '/homeMapList',
      name: 'HomeMapList',
      component: HomeMapList
    },
    {
      path: '/advertisementList',
      name: 'AdvertisementList',
      component: AdvertisementList
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
});

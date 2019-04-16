import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// var Parse = require('parse');
const Parse = require('parse');
Parse.initialize("myAppId", "myMasterKey");
Parse.serverURL = 'http://47.95.200.31:1340/api/1';
import TownMapList from '@/views/townMapList'
import HomeMapList from '@/views/homeMapList'

Vue.use(Router)

Vue.prototype.$parse = Parse;
// var AV = require('leancloud-storage');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TownMapList',
      component: TownMapList
    },
    {
      path: '/homeMapList',
      name: 'HomeMapList',
      component: HomeMapList
    }
  ]
})

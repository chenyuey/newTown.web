import Vue from 'vue'
import Router from 'vue-router'

// var Parse = require('parse');
const Parse = require('parse')
Parse.initialize('khYEI0xFyAnVCUpO', 'iFPUdLm3yCPNnRVknBWHn4z5VDczgHOL')
Parse.serverURL = 'http://47.95.200.31:1340/api/1'
import TownMapList from '@/views/townMapList'
import HomeMapList from '@/views/homeMapList'
import AdvertisementList from '@/views/advertisementList.vue'
import Test from '@/components/layout.vue'

Vue.use(Router)

Vue.prototype.$parse = Parse
// var AV = require('leancloud-storage');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TownMapList',
      component: TownMapList
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
})

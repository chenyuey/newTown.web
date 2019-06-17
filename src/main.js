// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../static/css/style.css'

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'oC8MxsGzSF85ISZPG4L3oZF64iuwW7eB'
})

// import Parse from 'parse'
Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(Parse)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

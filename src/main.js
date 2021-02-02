import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
//图片懒加载
import VueLazyLoad from 'vue-lazyload'

import './common/less/index.less'

Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  preLoad:1,
  loading:require('common/images/default.png'),
  attempt:2
})

//解决移动端三百秒延迟问题
fastClick.attach(document.body)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

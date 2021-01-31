import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'

import './common/less/index.less'

Vue.config.productionTip = false

//解决移动端三百秒延迟问题
fastClick.attach(document.body)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

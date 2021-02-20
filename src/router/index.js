import Vue from 'vue'
import Router from 'vue-router'

import recommend from 'components/recommend/recommend'
import singer from 'components/singer/singer'
import details from 'components/singer/children/detail-singer'
import rank from 'components/rank/rank'
import search from 'components/search/search'

//解决重复点击路由报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/recommend'
    },
    {
      path:'/recommend',
      component:recommend
    },
    {
      path:'/singer',
      component:singer,
      children:[
        {
          path:'/singer/:id',
          component:details
        }
      ]
    },
    {
      path:'/rank',
      component:rank
    },
    {
      path:'/search',
      component:search
    },
  ]
})

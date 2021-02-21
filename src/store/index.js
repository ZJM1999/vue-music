import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import mutations from './mutations'
//控制台打印的修改日志
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const state = {
  singer:{},
  //歌单列表
  songList:[],
  //播放列表
  list:[],
  //是否收起
  isMini:false,
  //是否播放
  isSong:false
}
//检测是否为生产环境
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  strict:debug,
  plugins:debug?[createLogger()]:[]
})
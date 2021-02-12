import * as types from './mutation-types'
const mutations = {
  [types.GET_SINGER](state,singer){
    state.singer = singer
  }
}

export default mutations
import * as types from './mutation-types'
const mutations = {
  [types.GET_SINGER](state,singer){
    state.singer = singer
  },
  [types.SET_SONGLIST](state,list){
    state.songList = list
  },
  [types.SET_LIST](state,list){
    state.list = list
  },
  [types.SET_ISMINI](state,flog){
    state.isMini = flog
  },
  [types.SET_ISSONG](state,flog){
    state.isSong = flog
  },
  [types.SET_CURRENTINDEX](state,index){
    state.currentIndex = index
  },
  [types.SET_CURRENTSONG](state){
    state.currentSong=state.songList[state.currentIndex]
  }
}

export default mutations
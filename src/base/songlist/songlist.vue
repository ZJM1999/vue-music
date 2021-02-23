<template>
  <div class="song-list">
    <ul>
      <li class="song-item" @click="showSongview(index)" v-for="(item,index) in songList" :key="index">
        <h2>{{item.name}}</h2>
        <p>{{item.singer}}·{{item.album}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import{mapMutations} from 'vuex'
export default {
  props:{
    songList:{
      type:Array,
      default:[]
    }
  },
  mounted(){
  },
  methods:{
    showSongview(index){
      this.setIsMini(true)
      this.setSongList(this.songList)
      this.setCurrentIndex(index)
      this.setCurrentSong()
      this.setIsSong(true)
    },
    ...mapMutations({
      setIsMini:'SET_ISMINI',
      setSongList:'SET_SONGLIST',
      setCurrentIndex:'SET_CURRENTINDEX',
      setCurrentSong:'SET_CURRENTSONG',
      setIsSong:'SET_ISSONG'
    })
  }
}
</script>

<style lang="less" scoped>
  .song-list{
    .song-item{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 35px;
      padding: 15px 0;
      h2{
        font-size: 15px;
        font-weight: 400;
        color: #fff;
      }
      p{
        white-space: nowrap;
        margin-top: 4px;
        font-weight: 400;
        font-size: 15px;
        color: hsla(0,0%,100%,.3);
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
  }
</style>
<template>
  <div class="song-list">
    <ul>
      <li class="song-item" v-for="(item,index) in songList" :key="index">
        <h2>{{item.name}}</h2>
        <p>{{item.singer}}·{{item.album}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    songList:{
      type:Array,
      default:[]
    }
  },
  mounted(){
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
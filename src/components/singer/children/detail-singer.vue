<template>
  <div class="detail-singer">
    <!-- 头部 -->
    <div class="title">
      <div class="title-left" @click="back"><i class="icon-back"></i></div>
      <h1>{{title}}</h1>
    </div>
    <!-- 图片区域 -->
    <div class="bgimage" ref="bgimageRef">
      <div class="filter"></div>
      <!-- 随机播放按钮 -->
      <div class="random-btn" v-show="isRandom">
        <i class="icon-play"></i>
        <span>随机播放全部</span>
      </div>
    </div>
    <!-- 遮挡层 -->
    <div class="bg-occlusion" ref="occlusionRef">
    </div>
      <!-- loading组件 -->
      <div class="loading-box" v-if="!list.length">
        <loading></loading>
      </div>
    <!-- 滚动的歌曲列表 -->
    <scroll :data="datas" :listenerScroll="listenerScroll" @scroll="scroll" class="scroll" ref="scrollRef">
      
      <div class="music-list" ref="scrollRef">
        <songlist :songList="songList"></songlist>
      </div>
    </scroll>
    
  </div>
</template>

<script>
import {getSingerDetail,getSong} from 'netWork/singer'
import {createSong} from 'common/js/song'

import {mapGetters} from 'vuex'
import axios from 'axios'

//组件
import Scroll from 'base/scroll/scroll'
import Songlist from 'base/songlist/songlist'
import Loading from 'base/loading/loading'
export default {
  data(){
    return{
      url:'',
      //歌曲数据
      list:[],
      //标题
      title:'',
      //歌曲信息数据
      songList:[],
      datas:[],
      detailUrl:'',
      //是否监听滚动
      listenerScroll:true,
      //滚动的y值
      scrollY:0,
      //控制随机播放按钮显示
      isRandom:true
    }
  },
  computed:{
    ...mapGetters({
      getSinger:'singer'
    })
  },
  created(){
    //请求歌手详情数据且对数据进行处理
    let id = this.getSinger.id
    if(this.getSinger.id ===undefined){
      id = this.$route.params.id
    }
    getSingerDetail(id).then(result=>{
      let i = result.data.trim().indexOf('{')+1
      let length = result.data.trim().length
      let data =JSON.parse(result.data.substring(i,length))
      this.list = data.data.list
      this.title = data.data.singer_name
      this.list.forEach((item)=>{
        this.songList.push(createSong(item.musicData))
      })
      console.log(this.songList);
      this.detailUrl = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.list[0].musicData.singer[0].mid}.jpg?max_age=2592000`
      this.$refs.bgimageRef.style['background-image'] = `url(${this.detailUrl})`
    })
    
    
    //请求播放数据vkey
    getSong('000BZ9Fg16MAU2').then(result=>{
      // console.log(result);
    })
  },
  methods:{
    scroll(pos){
      this.scrollY = pos.y
    },
    //返回按钮
    back(){
      this.$router.back()
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.datas = this.songList
      this.height = this.$refs.bgimageRef.clientHeight
      this.$refs.scrollRef.$el.style.top = this.height + 'px'
    })
  },
  components:{
    Scroll,
    Songlist,
    Loading
  },
  watch:{
    scrollY(newVal){
      //下拉效果
      if(newVal>0){
        let multiple = (1+newVal/300)>0?(1+newVal/300):1
        this.$refs.bgimageRef.style['transform'] = `scale(${multiple})`
      }
      //上滑效果
      if(newVal>-this.height+44){
        this.$refs.occlusionRef.style['transform'] = `translate3d(0,${newVal}px,0)`
        this.$refs.bgimageRef.style['paddingTop'] = '70%'
        this.$refs.bgimageRef.style['height'] = '0'
        this.$refs.bgimageRef.style['z-index'] = '0'
        this.isRandom = true
      }else{
        this.$refs.occlusionRef.style['transform'] = `translate3d(0,${-this.height+44}px,0)`
        this.$refs.bgimageRef.style['paddingTop'] = '0'
        this.$refs.bgimageRef.style['height'] = '44px'
        this.$refs.bgimageRef.style['z-index'] = '8'
        this.isRandom = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~common/less/standard';
  .detail-singer{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: @color-background;
    .title{
      position: absolute;
      z-index: 9;
      top: 0;
      height: 44px;
      width: 100%;
      .title-left{
        position: absolute;
        top: 0;
        left: 6px;
        .icon-back::before{
          content: '\E911';
          color: @color-theme;
          font-size: 22px;
          padding: 10px;
          line-height: 44px;
        }
      }
      h1{
        line-height: 44px;
        text-align: center;
        white-space: nowrap;
        font-size: 18px;
      }
    }
    .bgimage{
      position: relative;
      transform-origin: top;
      padding-top: 70%;
      box-sizing: border-box;
      width: 100%;
      height: 0;
      background-size: cover;
      .filter{
        background: rgba(7,17,27,.4);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .random-btn{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20px;
        color: @color-theme;
        border: 1px solid @color-theme;
        border-radius: 25px;
        padding: 10px 20px;
        font-size: 12px;
        i{
          vertical-align: bottom;
          font-size: 15px;
          margin-right: 5px;
        }
      }
    }
    .scroll{
      position: absolute;
      top: 0;
      // overflow: hidden;
      .loading-box{
        position: relative;
        height: 150px;
      }
    }
    .music-list{
      padding: 20px 30px;
    }
    .bg-occlusion{
      position: relative;
      height: 100%;
      background-color: @color-background;
    }
  }

</style>
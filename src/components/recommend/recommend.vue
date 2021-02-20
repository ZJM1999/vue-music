<template>
  <div class="recommend">
    <scroll :data="musicList" ref="scrollRef">
      <div class="recommend-content">
        <!-- 轮播图 -->
        <div v-if="slider.length" class="slider-wrapper">
          <slider>
            <div v-for="item in slider" :key="item.id">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="getImg" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <!-- 歌单列表 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
            <!-- loading组件 -->
          <div class="loading-container" v-if="!musicList.length">
            <loading></loading>
          </div>
          <ul>
            <li class="list-item" v-for="item in musicList" :key="item.dissid">
              <div class="list-img">
                <img width="60" height="60" v-lazy="item.imgurl" alt="">
              </div>
              <div class="list-content">
                <h2 v-html="item.creator.name"></h2>
                <p v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
        
      </div>
    </scroll>
  </div>
</template>

<script>
import {getSlider,getMusicList} from 'netWork/recommend';


//组件
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading';

export default {
  data(){
    return {
      //轮播图数据
      slider:[],
      //歌单数据
      musicList:[],
      //是否已经刷新
      isRefresh:true
    }
  },
  created(){
    //请求轮播图数据
    getSlider().then((result)=>{
      if(result.code === 0){
        this.slider = result.data.slider
        console.log(this.slider);
      }
    })
    //请求歌单数据
      this.getList()
  },
  methods:{
    getList(){
      getMusicList().then((result)=>{
        if(result.code === 0){
          this.musicList = result.data.list
          this.$refs.scrollRef.refresh()
        }
      })
    },
    //图片加载完成的时候调用一次refresh，重新刷新scroll组件计算高度
    getImg(){
      if(this.isRefresh){
        this.$refs.scrollRef.refresh()
        this.isRefresh = false
      }
    }
    
    
  },
  components:{
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style lang="less" scoped>
  @import '~common/less/standard';
  .recommend{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    overflow: hidden;
  }
  .list-title{
    padding: 26px;
    text-align: center;
    font-size: 14px;
    color: @color-theme;
  }
  .loading-container{
    position: relative;
    height: 200px;
  }
  .list-item{
    display: flex;
    padding-bottom: 22px;
    justify-content: space-around;
    .list-img{
      display: flex;
      justify-content: center;
      flex: 1;
    }
    .list-content{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex:3;
      h2{
        font-size: 15px;
        font-weight: 400;
      }
      p{
        color: #999;
        font-size: 14px;
      }
    }
  }
</style>
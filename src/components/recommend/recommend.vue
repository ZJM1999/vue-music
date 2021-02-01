<template>
  <div class="recommend">
    <div class="recommend-content">
      <!-- 轮播图 -->
      <div v-if="slider.length" class="slider-wrapper">
        <slider>
          <div v-for="item in slider" :key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <!-- 歌单列表 -->
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getSlider} from 'netWork/recommend';
import Slider from 'base/slider/slider'
export default {
  data(){
    return {
      //轮播图数据
      slider:[]
    }
  },
  created(){
    //请求轮播图数据
    getSlider().then((result)=>{
      if(result.code === 0){
        this.slider = result.data.slider
      }
    })
  },
  components:{
    Slider
  }
}
</script>

<style lang="less" scoped>
  
</style>
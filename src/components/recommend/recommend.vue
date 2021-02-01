<template>
  <div class="recommend">
    <div class="recommend-content">
      <!-- 轮播图 -->
      <div class="slider-wrapper">
        
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
import {getSlider} from 'netWork/recommend'
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
  }
}
</script>

<style lang="less" scoped>
  
</style>
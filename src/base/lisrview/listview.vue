<template>
  <scroll 
  :data="datas" 
  :listenerScroll="true"
  class="listview" 
  ref="scrollRef" 
  @scroll="scroll">
    <ul>
      <li v-for="(item,index) in datas" :key="index" ref="itemLi">
        <div class="group-item">
          <span>{{item.title}}</span>
        </div>
        <ul class="group-list">
          <li v-for="(i,k) in item.items" :key="k">
            <img v-lazy="i.avator" alt="">
            <span>{{i.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 吸顶固定的title -->
    <div class="group-item fixed-title" v-show="height<0">
      <span>{{name}}</span>
    </div>
    <!-- 右侧指向条 -->
    <div class="list-shortcut">
      <ul>
        <li v-for="(item,index) in getShortcutArr"
          :key="item" :class="{'active':currentIndex===index}"
          @touchstart="getSingerPage"
          @touchmove.stop.prevent="shortcutMove" 
          :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll.vue'
import {getAttr} from 'common/js/dom'
export default {
  components: { Scroll },
  props:{
    datas:{
      type:Array,
      default:[]
    }
  },
  data(){
    return{
      //当前li位置的索引
      currentIndex:0,
      //是否监听滚动
      listenerScroll:true,
      //吸顶title的name
      name:'热门',
      //滚动时，当前li的高度
      height:0
    }
  },
  created(){
    this.touches={}
    this.index = 0
    
  },
  computed:{
    getShortcutArr(){
      return this.datas.map((item)=>{
        return item.title.substr(0,1)
      })
    }
  },
  methods:{
    //手指点击快捷导航列表事件
    getSingerPage(e){
      //获取当前li的index值
      let currentIndex = getAttr(e.target,'index')
      this.index = currentIndex
      this.currentIndex = parseInt(currentIndex)
      //保存第一个点击位置的pageY值
      this.touches.firstPageY = e.touches[0].pageY
      //调用better-scroll的scrollToElement事件
      this.$refs.scrollRef.scrollToElement(this.$refs.itemLi[currentIndex],0)
    },
    //监听手指在屏幕上移动事件
    shortcutMove(e){
      let LI_HEIGHT = 18  
      let i =(e.touches[0].pageY - this.touches.firstPageY)/LI_HEIGHT|0
      this.currentIndex = parseInt(this.index)+i
      this.$refs.scrollRef.scrollToElement(this.$refs.itemLi[this.currentIndex],0)
    },
    //监听滚动事件
    scroll(pos){
      this.height = pos.y
      this.getScrollCurrentHeight()
    },
    
    getScrollCurrentHeight(){
      //获取所有li的高度组成的数组
      let list = this.$refs.itemLi
      let listHeightArr = []
      let height = 0
      listHeightArr.push(height)
      list.forEach((item)=>{
        height+=item.clientHeight
        listHeightArr.push(height)
      })
      //获取当前位置对应的索引
      for(var i=0;i<listHeightArr.length;i++){
        let heightStart = listHeightArr[i]
        let heightEnd = listHeightArr[i+1]
        if(-this.height>heightStart&&-this.height<heightEnd){
          this.currentIndex = i
          this.name = this.getShortcutArr[i] ==='热'?'热门':this.getShortcutArr[i]
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~common/less/standard';
  .listview{
    transform: translate(0);
    .fixed-title{
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9;
    }
    .group-item{
      height: 30px;
      padding-left: 20px;
      background-color: @color-highlight-background;
      span{
        color: #999;
        font-size: 13px;
        line-height: 30px;
        font-weight: 600;
      }
    }
    .group-list{
      li{
        display: flex;
        align-items: center;
        padding: 20px 0 0 25px;
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        span{
          margin-left: 15px;
          color: @color-text-l;
        }
      }
    }
    .list-shortcut{
      width: 20px;
      position: fixed;
      padding: 20px 0;
      background-color: @color-background-d;
      border-radius: 25px;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      ul{
        padding: 0;
        margin: 0;
        li{
          padding:3px 0;
          text-align: center;
          color: @color-text-l;
          font-size: 12px;
          box-sizing: border-box;
        }
        .active{
          color: @color-theme;
        }
      }
    }
  }
</style>
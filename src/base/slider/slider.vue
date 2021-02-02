<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span v-for="(item,index) in dots" :key="index" :class="{active:currentPageindex===index}"></span>
    </div>
  </div>
</template>

<script>
import {addClass} from 'common/js/dom'
import BScroll from 'better-scroll'
export default {
  data(){
    return{
      dots:null,
      currentPageindex:0,
      //定时器
      timer:null
    }
  },
  //外部传入的数据
  props:{
    loop:{
      type:Boolean,
      default:true
    },
    //轮播间隔时间
    intervalTime:{
      type:Number,
      default:3000
    }
  },
  mounted(){
    setTimeout(() => {
      if(!this.$refs) return
      this.setSliderWidth()
      this.initSlider()
      this.autoPlay()
    }, 20);
    
  },
  methods:{
    //设置插槽内dom元素的宽度及样式
    setSliderWidth(){
      //获取轮播图图片dom数量集合
      let groupNum = this.$refs.sliderGroup.children
      this.dots = groupNum.length
      let width = 0
      //给每个图片group的容器div加上.slider-item类
      for(var i=0;i<groupNum.length;i++){
        addClass(groupNum[i],'slider-item')
        //获取图片的显示宽度
        width += groupNum[i].clientWidth
        groupNum[i].style.width = groupNum[i].clientWidth + 'px'
      }
      //如果自动轮播则宽度增加两个groupNum[i].clientWidth
      if(this.loop){
        width+=groupNum[0].clientWidth*2
      }
      this.$refs.sliderGroup.style.width = width + 'px'

    },
    //初始化轮播图
    initSlider(){
      this.slider = new BScroll(this.$refs.slider,{

        //与fastclick库冲突，且a链接有默认跳转功能，不需要添加click：true
        // click:true,
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })

      //监听滑动结束事件
      this.slider.on('scrollEnd',()=>{
        let index = this.slider.getCurrentPage().pageX
        if(this.loop){
          index-=1
        }
        this.currentPageindex = index

        //如果滑动结束发现存在一个定时器，则关闭定时器重新开启
        if(this.loop){
          clearInterval(this.timer)
          this.autoPlay()
        }
      })
    },

    //自动轮播
    autoPlay(){
      if(this.loop){
        this.timer = setInterval(()=>{
        let currentPage = this.slider.getCurrentPage().pageX+1
        this.slider.goToPage(currentPage,0,400)
      },this.intervalTime)
      }
    }
    
  },
  destroyed() {
    //组件销毁清除残留
    clearTimeout(this.timer)
  },
}
</script>

<style lang="less" scoped>
@import '~common/less/standard';
  .slider{
    position: relative;
    overflow: hidden;
    .slider-group{
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item{
        float: left;
        overflow: hidden;
        a{
          display: block;
          width: 100%;
          overflow: hidden;
        img{
          overflow: hidden;
          display: block;
          width: 100%;
        }
      }
      }
      
    }
    .dots{
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      overflow: hidden;
      span{
        float: left;
        width: 10px;
        height: 10px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: @color-text-l;
        &.active{
          width: 20px;
          border-radius: 5px;
          background: @color-text-ll;
        }
      }
    }
  }
</style>
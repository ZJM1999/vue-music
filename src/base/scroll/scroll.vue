<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props:{
    click:{
      type:Boolean,
      default:true
    },
    data:{
      type:Array,
      default:null
    },
    probeType:{
      type:Number,
      default:3
    },
    //是否滚动
    listenerScroll:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
      
  },
  methods:{
    //初始化better-scroll
    initScroll(){
      if(!this.$refs.wrapper) return 
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        click:this.click
      })
      //监听滚动事件
      if(this.listenerScroll){
        this.scroll.on('scroll',(pos)=>{
          this.$emit('scroll',pos)
        })
      }
    },
    //代理refresh方法，以供外部使用
    refresh(){
        this.scroll&&this.scroll.refresh()
    },
    //代理scrollToElement方法
    scrollToElement(){
      this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments)
    },
    //代理scrollTo方法
    scrollTo(){
      this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)
    },
    //代理goToPage方法
    goToPage(){
      this.scroll&&this.scroll.goToPage.apply(this.scroll,arguments)
    },
    
  },
  watch:{
    //当外部传入的data数据发生变化立即刷新滚动组件重新计算正确高度
    data(){
      this.$nextTick(()=>{
        this.initScroll()
        
      })
    }
    
    
  }
}
</script>

<style lang="less" scoped>
  .wrapper{
    overflow: hidden;
    height: 100%;
  }
</style>
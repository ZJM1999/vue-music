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
      default:1
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.initScroll()
    })
  },
  methods:{
    //初始化better-scroll
    initScroll(){
      if(!this.$refs.wrapper) return 
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        click:this.click
      })
    },
    //代理refresh方法，以供外部使用
    refresh(){
      this.scroll&&this.scroll.refresh()
    }
  },
  watch:{
    //当外部传入的data数据发生变化立即刷新滚动组件重新计算正确高度
    data(){
      this.scroll&&this.scroll.refresh()
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
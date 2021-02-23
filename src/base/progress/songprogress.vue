<template>
  <div class="progress-box">
    <span>{{getCurrentTime}}</span>
    <div class="progress-bg" ref="progressBg" @touchstart="progressClick">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn" 
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        ref="progressBtn"></div>
    </div>
    <span>{{getDuration}}</span>
   </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  props:{
    percentage:{
      type:Number
    },
    //当前播放时间
    currentTime:{
      type:Number,
      default:0
    },
    //播放总时间
    duration:{
      type:Number,
      default:0
    }
  },
  computed:{
    getCurrentTime(){
      return this.format(this.currentTime)
    },
    getDuration(){
      return this.format(this.duration)
    }
  },
  created() {
    this.touch = {}
  },
  methods:{
    //转换时间格式
    format(time){
      let minute = time/60 | 0 <10?'0'+(time/60 | 0):time/60 | 0
      let second = time%60<10?'0'+parseInt(time%60):parseInt(time%60)
      return minute+':'+second
    },
    touchstart(e){
        this.touch.progressWidth = this.$refs.progress.clientWidth
        this.touch.pageX = e.touches[0].pageX
    },
    touchmove(e){
        this.touch.newPageX = e.touches[0].pageX - this.touch.pageX
    },
    touchend(e){
        let newWidth = this.touch.progressWidth+this.touch.newPageX
        this.$refs.progress.style.width = newWidth +'px'
        this.$refs.progressBtn.style['transform'] = `translate3d(${newWidth}px,0,0)`
        //修改外部percentage
        this.setPercentage(newWidth)
        //修改isSong值
        this.setIsSong(true)
    },
    //修改外部percentage
    setPercentage(val){
      let newPercentage = val/this.$refs.progressBg.clientWidth
      this.$emit('setPercentage',newPercentage)
    },
    //点击进度条
    progressClick(e){
      let durationWidth = e.touches[0].pageX - this.$refs.progressBg.offsetLeft
      this.setPercentage(durationWidth)
      //修改isSong值
      this.setIsSong(true)
    },
    ...mapMutations({
      setIsSong:'SET_ISSONG'
    })
  },
  watch:{
    percentage(newVal){
      //小球宽度
      let posWidth = 14
      //总进度宽度
      let progressWidth = this.$refs.progressBg.clientWidth-14
      //当前时间需要的宽度
      let width = progressWidth * newVal
      this.$refs.progress.style.width = width+'px'
      this.$refs.progressBtn.style['transform'] = `translate3d(${width}px,0,0)`
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~common/less/standard';
  .progress-box{
    display: flex;
    align-items: center;
    height: 50px;
    width: 80%;
    margin: 0 auto;
    span{
      font-size: 12px;
    }
    .progress-bg{
      touch-action: none;
      position: relative;
      margin: 0 5px;
      width: 240px;
      height: 4px;
      border-radius: 5px;
      background-color: @color-highlight-background;
      .progress{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color:@color-theme;
      }
      .progress-btn{
        position: absolute;
        left: 0px;
        top: -7px;
        width: 11px;
        height: 11px;
        border: 3px solid #eee;
        border-radius: 50%;
        background-color:@color-theme;
      }
    }
  }
</style>
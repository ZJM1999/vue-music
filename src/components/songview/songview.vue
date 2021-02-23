<template>
  <div class="song-view" v-if="getSongList.length">
    <transition name="main"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="main-view" v-show="getIsMini">
      <!-- 背景滤镜 -->
      <div class="bgc">
        <img :src="getCurrentSong['image']" alt="">
      </div>
      <div class="top">
        <i class="icon-back" @click="back"></i>
        <h1>{{getCurrentSong.name}}</h1>
        <h2>{{getCurrentSong.singer}}</h2>
      </div>
      <div class="img">
        <div class="bg-img" ref="cdWrapper">
           <img :class="getImgClass" :src="getCurrentSong['image']" alt="">
        </div>
      </div>
      <!-- 歌词 -->
      <div class="song-lyric">
        <p>{{getCurrentSong.album}}-{{getCurrentSong.singer}}</p>
      </div>
      <div class="bottom">
        <!-- 左右滑动dog -->
        <div class="dog">
          <span class="active"></span>
          <span></span>
        </div>
        <!-- 进度条 -->
        <songprogress 
          :percentage="getPercentage" 
          :currentTime="currentTime" 
          :duration="duration"
          @setPercentage="setPercentage"
          ></songprogress>
        <!-- 操作条 -->
        <div class="operators">
          <div class="icon icon-left">
            <i class="icon-loop"></i>
          </div>
          <div class="icon icon-left" @click="pre">
            <i class="icon-prev"></i>
          </div>
          <div class="icon icon-center" @click="toggle">
            <i class="needsclick" :class="getSongClass"></i>
          </div>
          <div class="icon icon-right" @click="next">
            <i class="icon-next"></i>
          </div>
          <div class="icon icon-right">
            <i class="icon icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <transition name="mini">
      <div class="mini-view" v-show="!getIsMini" @click="showSongview">
      <div class="mini-img-box">
        <div class="mini-img">
          <img :class="getImgClass" :src="getCurrentSong['image']" alt="">
        </div>
      </div>
      <div class="mini-text">
        <h2>{{getCurrentSong['name']}}</h2>
        <p>{{getCurrentSong['singer']}}</p>
      </div>
      <div class="play">
        <i class="icon-mini" :class="getSongClassMini" @click.stop="toggle"></i>
      </div>
      <div class="song-list">
        <i class="icon-playlist"></i>
      </div>
    </div>
    </transition>
    <!-- 音乐播放器 -->
    <audio ref="songAudio" @timeupdate="update" @canplay="ready" src="http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400002zfxmN2e1vLQ.m4a?guid=6419761116&vkey=502524BCE69E820EF670AD90EA80894D3ECDD27F204661A59DD58DAF4A0B6A94B39B6C5196919A3BF5516E14D91570DE5ED5444A703CF6F2&uin=0&fromtag=38"></audio>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import animations from 'create-keyframe-animation'
import Songprogress from 'base/progress/songprogress'
export default {
  data(){
    return{
      //当前音乐播放时间
      currentTime:0,
      //当前音乐总时间
      duration:0
    }
  },
  components:{
    Songprogress
  },
  computed:{
    ...mapGetters({
      getSongList:'songList',
      getIsMini:'isMini',
      getCurrentSong:'currentSong',
      getIsSong:'isSong',
      getCurrentIndex:'currentIndex'
    }),
    getPercentage(){
      return this.currentTime/this.duration
    },
    getSongClass(){
      return this.getIsSong?'icon-pause':'icon-play'
    },
    getSongClassMini(){
      return this.getIsSong?'icon-pause-mini':'icon-play-mini'
    },
    getImgClass(){
      return this.getIsSong?'play':'play pause'
    }
  },
  methods:{
    //切换mini播放器
    back(){
      this.setIsMini(false)
    },
    //音乐播放时触发
    update(e){
      this.currentTime = e.target.currentTime
    },
    //显示播放页面
    showSongview(){
      this.setIsMini(true)
    },
    //动画函数钩子
    enter(el,done){
      const {x, y, scale} = this.getPosAndScale()
        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(-160px,-160px,0) scale(1.2)`
          },
          100: {
            transform: `translate3d(-160px,-160px,0) scale(1)`
          }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })

        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter(){
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el,done){
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      const {x, y, scale} = this.getPosAndScale()
      this.$refs.cdWrapper.style['transform'] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave(){
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style['transform'] = ''
    },
    getPosAndScale(){
      const targetWidth = 40
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)-width/2
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom-width/2
      return {
        x,y,scale
      }
    },
    //修改percentage
    setPercentage(percentage){
      let duration = this.$refs.songAudio.duration
      this.$refs.songAudio.currentTime = duration * percentage
    },
    //上一首
    pre(){
      this.setCurrentIndex(this.getCurrentIndex-1)
      if(this.getCurrentIndex===0){
        this.setCurrentIndex(this.getSongList.length-1)
      }
    },
    //下一首
    next(){
      this.setCurrentIndex(this.getCurrentIndex+1)
      if(this.getCurrentIndex===this.getSongList.length-1){
        this.setCurrentIndex(0)
      }
    },
    //音乐播放器播放
    ready(){
      this.$refs.songAudio.play()
      this.duration = this.$refs.songAudio.duration
    },
    //暂停/开始播放
    toggle(){
      this.setIsSong(!this.getIsSong)
    },
    
    ...mapMutations({
      setIsMini:'SET_ISMINI',
      setIsSong:'SET_ISSONG',
      setCurrentIndex:'SET_CURRENTINDEX'
    })
  },
  watch:{
    getIsSong(newVal){
      if(newVal){
        this.$refs.songAudio.play()
      }else{
        this.$refs.songAudio.pause()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~common/less/standard';
  .song-view{
    .main-view{
      position: fixed;
      z-index: 2;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: #222;
      .bgc{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: .7;
        filter: blur(20px);
        z-index: -1;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .top{
        position: relative;
        i{
          position: absolute;
          left: 0;
          margin-left: 8px;
          padding: 9px;
          color:@color-theme;
          font-size: 22px;
          transform: rotate(-90deg);
        }
        h1{
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 18px;
          color: #fff;
        }
        h2{
          font-size: 14px;
          color: #fff;
          text-align: center;
          height: 20px;
          line-height: 20px;
        }
      }
      .img{
        position: relative;
        height: 300px;
        padding: 20px 10px;
        .bg-img{
          -webkit-transform-origin:center center;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          overflow: hidden;
          border: 10px solid hsla(0,0%,100%,.1);
          .play{
            animation: rotate 10s linear infinite;
          }
          .pause{
            animation-play-state: paused;
            -webkit-animation-play-state:paused;
            animation-fill-mode:forwards;
          }
        }
      }
      .song-lyric{
        padding: 20px 20px;
        p{
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: @color-text-l;
          font-size: 14px;
          font-weight: 400;
        }
      }
      .bottom{
        position: absolute;
        bottom: 50px;
        width: 100%;
        .dog{
          text-align: center;
          span{
            display: inline-block;
            width: 8px;
            height: 8px;
            margin: 0 4px;
            border-radius: 5px;
            background: hsla(0,0%,100%,.8);
            &.active{
              width: 20px;
            }
          }
        }
        
        .operators{
          width: 80%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .icon{
            touch-action: none;
            &.icon-center{
              font-size: 50px;
            }
            font-size: 30px;
            color: @color-theme;
          }
        }
      }
      
    }
    .mini-view{
      position: absolute;
      display: flex;
      align-items: center;
      bottom: 0;
      left: 0;
      height: 60px;
      width: 100%;
      background-color: @color-highlight-background;
      .mini-img-box{
        height: 40px;
        padding: 0 10px 0 20px;
        .mini-img{
          width: 40px;
          margin-right: 10px;
          img{
            width: 100%;
            border-radius: 50%;
            &.play{
            animation: rotate 10s linear infinite;
            }
            &.pause{
              animation-play-state: paused;
            }
          }
        }
      }
      .mini-text{
          height: 42px;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-around;
          h2{
            margin-bottom: 2px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 14px
          }
          p{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 12px;
            color: @color-text-d;
          }
       }
      .play{
        padding: 0 10px;
        color: @color-theme;
        font-size: 32px;
      }
      .song-list{
        padding: 0 10px;
        color: @color-theme;
        font-size: 32px;
      }
    }
  }

  .main-enter,.main-leave-to{
    opacity:0;
    .top{
      transform: translate3d(0, -100px, 0);
    }
    .bottom{
      transform: translate3d(0, 100px, 0);
    }
  }
  .main-enter-active,.main-leave-active{
    transition: all .4s linear;
    .top,.bottom{
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }

  @keyframes rotate {
    0%{
      transform: rotate(0);
    };
    100%{
      transform: rotate(360deg);
    }
  }
</style>
<template>
  <div class="song-view" v-show="!getSongList.length">
    <div class="main-view" v-show="getIsMini">
      <!-- 背景滤镜 -->
      <div class="bgc">
        <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000K9Zp13TZp5s.jpg?max_age=2592000" alt="">
      </div>
      <div class="top">
        <i class="icon-back" @click="back"></i>
        <h1>天外来物</h1>
        <h2>薛之谦</h2>
      </div>
      <div class="img">
        <div class="bg-img">
           <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000K9Zp13TZp5s.jpg?max_age=2592000" alt="">
        </div>
      </div>
      <!-- 歌词 -->
      <div class="song-lyric">
        <p>天外来物-薛之谦(joker)</p>
      </div>
      <div class="bottom">
        <!-- 左右滑动dog -->
        <div class="dog">
          <span class="active"></span>
          <span></span>
        </div>
        <!-- 歌词条 -->
        <div class="progress-box">
          <span>0:00</span>
          <div class="progress">
            <div class="progress-dog"></div>
          </div>
          <span>4:17</span>
        </div>
        <!-- 操作条 -->
        <div class="operators">
          <div class="icon icon-left">
            <i class="icon-loop"></i>
          </div>
          <div class="icon icon-left">
            <i class="icon-prev"></i>
          </div>
          <div class="icon icon-center">
            <i class="needsclick icon-play"></i>
          </div>
          <div class="icon icon-right">
            <i class="icon-next"></i>
          </div>
          <div class="icon icon-right">
            <i class="icon icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mini-view" v-show="!getIsMini" @click="showSongview">
      <div class="mini-img-box">
        <div class="mini-img">
          <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000K9Zp13TZp5s.jpg?max_age=2592000" alt="">
        </div>
      </div>
      <div class="mini-text">
        <h2>天外来物</h2>
        <p>薛之谦</p>
      </div>
      <div class="play">
        <i class="icon-mini icon-play-mini"></i>
      </div>
      <div class="song-list">
        <i class="icon-playlist"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      getSongList:'songList',
      getIsMini:'isMini'
    })
  },
  methods:{
    //切换mini播放器
    back(){
      this.setIsMini(false)
    },
    //显示播放页面
    showSongview(){
      this.setIsMini(true)
    },
    ...mapMutations({
      setIsMini:'SET_ISMINI'
    })
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
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          overflow: hidden;
          border: 10px solid hsla(0,0%,100%,.1);
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
        .progress-box{
          display: flex;
          align-items: center;
          height: 50px;
          width: 80%;
          margin: 0 auto;
          .progress{
            width: 240px;
            height: 4px;
            border-radius: 5px;
            background-color: @color-highlight-background;
            .progress-dog{

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
          img{
            width: 100%;
            border-radius: 50%;
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
</style>
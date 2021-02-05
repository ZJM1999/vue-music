<template>
  <scroll :data="datas" class="listview" ref="scrollRef">
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
    <!-- 右侧指向条 -->
    <div class="list-shortcut">
      <ul>
        <li v-for="(item,index) in getShortcutArr" :key="item" @touchstart="getSingerPage" :data-index="index">
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
      //调用better-scroll的scrollToElement事件
      this.$refs.scrollRef.scrollToElement(this.$refs.itemLi[currentIndex],0)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~common/less/standard';
  .listview{
    transform: translate(0);
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
        }
        .active{
          color: @color-theme;
        }
      }
    }
  }
</style>
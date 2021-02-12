<template>
  <div class="singer">
    <listview :datas="singerList" @select="select"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from 'netWork/singer'
import Singer from 'common/js/singer'
import {mapMutations} from 'vuex'
//组件
import Listview from 'base/lisrview/listview.vue'


export default {
  data(){
    return{
      singerList:[]
    }
  },
  created(){
    this.getSingers()
  },
  methods:{
    getSingers(){
      getSingerList().then((result)=>{
        let list = result.data.list
        let HOT_NAME = '热门'
        //热门数据为前10条
        let HOT_LENGTH = 10
        //对数据进行处理
        let map = {
          hot:{
            title:HOT_NAME,
            items:[]
          }
        }
        list.forEach((item,index) => {
          //判断是否为热门分类
          if(index<HOT_LENGTH){
            //给二维内数组items添加数据
            map.hot.items.push(new Singer({
              id:item.Fsinger_mid,
              name:item.Fsinger_name
            }))
          }
          //判断map是否有这个分类属性，没有则添加
          if(!map[item.Findex]){
            map[item.Findex] = {
              title:item.Findex,
              items:[]
            }
          }
          //给其他分类的二维数组item添加数据
          map[item.Findex].items.push(new Singer({
              id:item.Fsinger_mid,
              name:item.Fsinger_name
            }))
          
        });
          //将外层对象转成数组
          let hot = []
          let res = []
          for (const key in map) {
            if(map[key].title === HOT_NAME){
              hot.push(map[key])
            }
            if(map[key].title.match(/[a-zA-Z]/)){
              res.push(map[key])
            }
          }
          //对字母进行排序
          res.sort((a,b)=>{
                return a.title.charCodeAt(0)-b.title.charCodeAt(0)
              })
          map = hot.concat(res)
          this.singerList = map
      })
    },
    //调用listview派发的点击进入详情页事件
    select(singer){
        this.$router.push({
        path:`/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    //vuex
    ...mapMutations({
      setSinger:"GET_SINGER"
    })
  },
  components:{
    Listview
  }
}
</script>

<style lang="less" scoped>
  .singer{
    position: fixed;
    bottom: 0;
    top: 88px;
    width: 100%;
  }
</style>
<template>
  <div class="detail-singer">
    <h1>detail</h1>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'netWork/singer'
import axios from 'axios'
export default {
  created(){
    console.log(this.getSinger);
  },
  computed:{
    ...mapGetters({
      getSinger:'singer'
    })
  },
  created(){
    getSingerDetail().then(result=>{
      let i = result.data.trim().indexOf('{')+1
      let length = result.data.trim().length
      let data =JSON.parse(result.data.substring(i,length))
      console.log(data);
    })
  },
  methods:{
    
  }
}
</script>

<style lang="less">
  @import '~common/less/standard';
  .detail-singer{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: @color-background;
  }
</style>
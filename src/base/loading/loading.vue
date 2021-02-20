<template>
  <div class="loading">
    <img src="./loading.gif" alt="">
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:'正在加载中...'
    }
  }
}
</script>

<style lang="less">
  .loading{
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    img{
      width: 50px;
      padding-left: 8px;
    }
    p{
      font-size: 13px;
      color: #ffcd32;
    }
  }
</style>
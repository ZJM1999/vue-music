<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <songview></songview>
  </div>
</template>

<script>
import MHeader from 'components/header/header.vue'
import Tab from 'components/tab/tab'
import Songview from 'components/songview/songview'
export default {
  name: 'App',
  components:{
    MHeader,
    Tab,
    Songview
  },
}
</script>

<style lang='less'>
</style>

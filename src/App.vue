<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-08 13:53:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-16 16:47:59
 -->
<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.van-tabs--line .van-tabs__wrap {
    box-shadow: 0px 10px 10px -10px rgba(0,0,0,0.1);
}
.van-grid-item__content{
  padding:8px 0 !important;
}
.van-nav-bar .van-icon{
  color:#666 !important;
}

</style>

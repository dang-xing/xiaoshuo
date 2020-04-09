<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-08 14:09:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-08 14:19:18
 -->
<template>
  <section>
    <van-tabbar v-model="active" active-color="#07c160" inactive-color="#000">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="freinds-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </section>
</template>
<script>
export default {
  data() {
    return {
      active:0,
    }
  },
}
</script>
<style lang="scss" scoped>

</style>
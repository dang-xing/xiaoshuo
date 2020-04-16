<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-08 14:09:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-16 16:36:23
 -->
<template>
  <section>
    <van-tabbar v-model="active" active-color="#07c160" inactive-color="#000">
      <van-tabbar-item class="iconfont icon-shujia">书架</van-tabbar-item>
      <van-tabbar-item icon="qr-invalid">分类</van-tabbar-item>
      <van-tabbar-item class="iconfont icon-shucheng-xiantiao">书城</van-tabbar-item>
      <van-tabbar-item class="iconfont icon-wode">我的</van-tabbar-item>
    </van-tabbar>
  </section>
</template>
<script>
export default {
  data() {
    return {
      active:2,
    }
  },
}
</script>
<style lang="scss" scoped>

</style>
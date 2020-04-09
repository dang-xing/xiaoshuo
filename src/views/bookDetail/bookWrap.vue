<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-09 17:15:25
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-09 17:51:58
 -->
<template>
  <section class="wrap">
     <van-cell :title="wrapInfo.title"/>
    <p v-html="wrapInfo.body"></p>
  </section>
</template>
<script>
import {requestWrap} from '../../api/api.js'
export default {
  data() {
    return {
      wrapInfo:'',
    }
  },
  created() {
    this.getWrap();
  },
  methods: {
    getWrap(){
      requestWrap({bookId:this.$route.query.bookId,chapterId:this.$route.query.chapterId}).then((res)=>{
        console.log(res);
        if(res.data.ok){
          this.wrapInfo=res.data.chapter;
          this.wrapInfo.body=this.wrapInfo.body.replace(/。/g,'。</p><p>')
          console.log(this.wrapInfo.body)
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.wrap{
  box-sizing: border-box;
  height:100%;
  padding:0 15px;
  background: url(../../assets/bg.jpg);
  p{
    font-size: 16px;
    color: #666;
    line-height: 40px;
    text-indent: 32px;
  }
}
</style>
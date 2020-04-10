<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-09 16:46:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-10 09:40:29
 -->
<template>
  <section>
    <van-nav-bar
      title="目录"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell v-for="(item, index) in chapterData" @click="goWrap(item._id,index)" :key="index" :title="item.title" />
  </section>

</template>
<script>
import {requestChapterList} from '../../api/api.js'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: true,
      chapterData:'',
    }
  },
  created() {
    this.getChapterList();
  },
  methods: {
    onClickLeft(){
      
    },
    goWrap(id,index){
      this.$router.push({
        path:`/bookWrap?bookId=${this.$route.query.id}&chapterId=${id}&index=${index}`
      })
    },
    getChapterList(){
      requestChapterList({bookId:this.$route.query.id}).then((res)=>{
        console.log(res);
        if(res.data.ok){
          this.chapterData=res.data.chapterInfo.chapters;
          sessionStorage.setItem('chapterData',JSON.stringify(this.chapterData));
        }
      })
    }
    
  },
}
</script>
<style lang="scss" scoped>

</style>
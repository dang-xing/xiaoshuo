<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-09 16:46:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-16 16:26:57
 -->
<template>
  <section>
    <van-nav-bar
      title="目录"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
    <van-cell v-for="(item, index) in chapterListData" @click="goWrap(item._id,index)" :key="index" :title="item.title" />
    </van-list>
  </section>

</template>
<script>
import {requestChapterList} from '../../api/api.js'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      chapterData:'',
      chapterListData:[],
      currentPage:1,
    }
  },
  created() {
    this.getChapterList();
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1);
    },
    goWrap(id,index){
      this.$router.push({
        path:`/bookWrap?bookId=${this.$route.query.id}&chapterId=${id}&index=${index}`
      })
    },
    onLoad(){
        var arr=this.pagination(30,this.currentPage,this.chapterData)
        for (let i = 0; i < arr.length; i++) {
          this.chapterListData.push(arr[i]);
        }
        // 加载状态结束
        this.currentPage++
        this.loading = false;
        // 数据全部加载完成
        if (this.chapterListData.length == this.chapterData.length) {
          this.finished = true;
        }
    },
    getChapterList(){
       this.$toast.loading({
        message: '加载中...',
      });
      requestChapterList({bookId:this.$route.query.id}).then((res)=>{
        console.log(res);
        if(res.data.ok){
          this.chapterData=res.data.chapterInfo.chapters;
          if(this.chapterData!=''){
            this.onLoad();
            this.$toast.clear();
          }
          sessionStorage.setItem('chapterData',JSON.stringify(this.chapterData));
        }
      })
    },
    pagination(pageSize, currentPage, arr) {
      var skipNum = (currentPage - 1) * pageSize;
      var newArr = (skipNum + pageSize >= arr.length) ? arr.slice(skipNum, arr.length) : arr.slice(skipNum, skipNum + pageSize);
      return newArr;
    },
    
  },
}
</script>
<style lang="scss" scoped>

</style>
<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-08 13:59:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-09 16:37:04
 -->
<template>
  <section>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
    />
    <van-tabs v-model="active" swipeable animated :border="false" @click="TabClick" @change="TabClick">
      <van-tab title="男生">
        <bookList :bookListData="bookListData" v-if="flag"></bookList>
      </van-tab>
      <van-tab title="女生">
        <bookList :bookListData="bookListData"></bookList>
      </van-tab>
      <van-tab title="出版">
        <bookList :bookListData="bookListData"></bookList>
      </van-tab>
    </van-tabs>
    <tabNav></tabNav>
  </section>
</template>
<script>
import bookList from '@/components/bookList/bookList'
import tabNav from '@/components/bottomNav/nav'
import {requestBookList} from '../../api/api.js'
export default {
  data() {
    return {
      value:'',
      active:0,
      bookListData:'',
      flag: false,
    };
  },
  created() {
    this.getBookList('male');
  },
  methods: {
    TabClick(tab){
      switch (tab){
        case 0:
        this.getBookList('male');
        break;
        case 1:
        this.getBookList('female');
        break;
        case 2:
        this.getBookList('press');
        break;
      }
    },
    getBookList(type){
      this.bookListData=[]; 
      this.$toast.loading({
        message: '加载中...',
      });
      requestBookList({gender:type}).then((res)=>{
        if(res.data.ok){
          this.bookListData=res.data.data;
          this.flag = true
          this.$toast.clear();
        }
      })
    }
  },
  components:{
    bookList,
    tabNav,
  }
};
</script>
<style lang="scss" scoped>
</style>
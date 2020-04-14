<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-13 15:01:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-14 17:18:31
 -->
<template>
  <section>
    <div class="search">
    <van-search
      v-model="searchKey"
      placeholder="请输入搜索关键词"
      shape="round"
      show-action
      clearable
      @input="onSearch"
      @search="onSearchText"
      @cancel="onCancel"
    />
    </div>
    <div class="box-height"></div>
    <div v-if="isBookList">
      <van-cell v-for="item in keyData" :key="item" :title="item" @click="goBookList(item)" />
    </div>
    <div v-if="isList">
    <van-cell title="热门搜索" value="换一换" />
    <div class="main-body">
      <van-row class="searchList">
        <van-col :span="12" v-for="(item, index) in hotKeywords" :key="index">
          <van-button icon="description" class="btn-b van-ellipsis" @click="goSearchBook(item)" type="primary">{{item |subStr}}</van-button>
        </van-col>
      </van-row>
    </div>
    <div class="box-line"></div>
    <van-cell title="搜索历史" value="删除" />
    <div class="main-body">
      <van-tag style="margin-right:10px;" round v-for="(item, index) in localData" :key="index" @click="goSearchBook(item)">{{item}}</van-tag>
    </div>
    </div>
    <div v-if="isShowDetail">
    <section class="main-body">
      <van-row class="boy-hot" v-for="(item, index) in bookDataDetail" :key="index">
      <div @click="goDetail(item.book_id)">
        <van-col span="8">
          <img :src="item.book_cover" width="90%"/>
        </van-col>
        <van-col span="16">
            <h2>{{item.book_name}}</h2>
            <p>{{item.book_short_intro}}</p>
            <van-cell :title="item.book_author" is-link style="padding:5px 0 0 0;">
              <template #right-icon>
                <van-tag type="danger" plain>{{item.book_word_count|sytNumber}}</van-tag>
                <span class="wid"></span>
                <van-tag type="danger">{{item.cat_name}}</van-tag>
              </template>
            </van-cell>
        </van-col>
      </div>
     </van-row>
     </section>
     <div class="box-line" v-if="similarData.length!=0"></div>
     <van-cell title="相同类型书籍推荐" v-if="similarData.length!=0"/>
     <div class="main-body" v-if="similarData.length!=0">
     <van-row class="boy-hot" v-for="(item, index) in similarData" :key="index">
        <div @click="goDetail(item.book_id)">
        <van-col span="8">
          <img :src="item.book_cover" width="90%"/>
        </van-col>
        <van-col span="16">
            <h2>{{item.book_name}}</h2>
            <p>{{item.book_short_intro}}</p>
            <van-cell :title="item.book_author" is-link style="padding:5px 0 0 0;">
  <!-- 使用 title 插槽来自定义标题 -->
              <template #right-icon>
                <van-tag type="danger" plain>{{item.book_word_count |sytNumber}}</van-tag>
                <span class="wid"></span>
                <van-tag type="danger">{{item.cat_name}}</van-tag>
              </template>
            </van-cell>
        </van-col>
        </div>
     </van-row>
    </div>
    </div>
  </section>
</template>
<script>
import {requestKeyWords,requestSearchBook,requestSearchBookList,requestSearchBookDetail} from '../../api/api.js'
export default {
  data() {
    return {
      searchKey:'',
      hotKeywords:'',
      bookData:[],
      keyData:[],
      bookDataDetail:[],
      isList:false,
      isBookList:false,
      isShowDetail:false,
      similarData:[],
      localData:localStorage.getItem('_search_')==undefined?[]:JSON.parse(localStorage.getItem('_search_')),
    }
  },
  beforeMount() {
    this.getHotKeyWords();
  },
  methods: {
    getHotKeyWords(){
      let arr=JSON.parse(localStorage.getItem('_search_'));
      this.localData=this.unique(arr)
      console.log(this.localData);
      requestKeyWords().then((res)=>{
        console.log(res);
        if(res.data.ok){
          this.hotKeywords=res.data.hotKeywords;
          this.isList=true;
          this.isBookList=false;
          this.isShowDetail=false;
        }
      })
    },
    goDetail(id){
      this.$router.push({
        path:'/bookDetail?id='+id
      })
    },
    onCancel(){
      this.$router.go(-1);
    },
    goBookList(value){
      requestSearchBookDetail({keywords:value}).then((res)=>{
        console.log(res);
        if(res.data.ok){
          this.bookDataDetail=res.data.data.book_list_by_name;
          this.similarData=res.data.data.book_list_by_equal_tags;  
          this.isBookList=false;
          this.isList=false;
          this.isShowDetail=true;
          this.localData.push(value);
          localStorage.setItem('_search_',JSON.stringify(this.localData))
        }
      })
    },
    unique (arr) {
      return Array.from(new Set(arr))
    },
    goSearchBook(value){
      this.searchKey=value;
      this.goBookList(value);
    },
    onSearch(value){
      this.searchBook(value);
    },
    onSearchText(){
      this.bookDataDetail=[];
      requestSearchBookList({keywords:this.searchKey}).then((res)=>{
        if(res.data.ok){
          this.bookDataDetail=res.data.data.book_list_by_vague;
          this.localData.push(this.searchKey)
          localStorage.setItem('_search_',JSON.stringify(this.localData))
          this.similarData=[];
          this.isBookList=false;
          this.isList=false;
          this.isShowDetail=true;
        }
      })
    },
    searchBook(key){
      this.isBookList=true;
      this.isList=false;
      this.isShowDetail=false;
      if(key==''){
        this.isList=true;
      }
      requestSearchBook({keywords:key}).then((res)=>{
        console.log(res);
        if(res.data.ok){
          this.keyData=res.data.keywords;
        }
      })
    },
  },
  filters:{
    subStr(value){
      return value.substring(0,8)
    },
    sytNumber(value){
      return Math.floor(value/10000)+'万字'
    }
  }
}
</script>
<style lang="scss" scoped>
.main-body {
  box-sizing: border-box;
  padding: 10px;
}
.searchList{
  .btn-b{
    background: none;
    border:none;
    color: #666;
    font-size: 14px;
  }
}
.box-height{
  width:100%;
  height:50px;
}
.box-line{
  width: 100%;
  height: 5px;
  background-color: #f1f1f1;
}
.search{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:40px;
  z-index:10;
}
.boy-hot{
  margin-bottom: 10px;
  h2{
    font-size: 16px;
    font-weight: normal;
    margin: 0;
  }
  p{
    margin:5px 0;
    font-size:13px;
    line-height: 25px;
    letter-spacing: 1px;
    color:#666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  img{
    max-height: 141px;
    min-height: 141px;
  }
  .wid{
    width:10px;
  }
}
</style>
<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-13 15:01:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-13 17:58:11
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
    />
    </div>
    <div class="box-height"></div>
    <div class="main-body">
      <van-cell v-for="item in keyData" :key="item" :title="item" />
    </div>
    <div v-if="keyData.length==0">
    <van-cell title="热门搜索" value="换一换" />
    <div class="main-body">
      <van-row class="searchList">
        <van-col :span="12" v-for="(item, index) in hotKeywords" :key="index">
          <van-button icon="description" class="btn-b van-ellipsis" type="primary">{{item |subStr}}</van-button>
        </van-col>
      </van-row>
    </div>
    <div class="box-line"></div>
    <van-cell title="搜索历史" value="删除" />
    <div class="main-body">
      <van-tag round>神医小农民</van-tag>
    </div>
    </div>
    <section class="main-body" v-if="bookData.length!=0">
      <van-row class="boy-hot" v-for="(item, index) in everybodyData" :key="index">
        <div @click="goDetail(item._id)">
        <van-col span="8">
          <img :src="item.cover" width="90%"/>
        </van-col>
        <van-col span="16">
            <h2>{{item.title}}</h2>
            <p>{{item.longIntro}}</p>
            <van-cell :title="item.author" is-link style="padding:5px 0 0 0;">
  <!-- 使用 title 插槽来自定义标题 -->
              <template #right-icon>
                <van-tag type="danger">{{item.cat.name}}</van-tag>
              </template>
            </van-cell>
        </van-col>
        </div>
     </van-row>
    </section>
  </section>
</template>
<script>
import {requestKeyWords,requestSearchBook} from '../../api/api.js'
export default {
  data() {
    return {
      searchKey:'',
      hotKeywords:'',
      bookData:[],
      keyData:[],
    }
  },
  beforeMount() {
    this.getHotKeyWords();
  },
  methods: {
    getHotKeyWords(){
      requestKeyWords().then((res)=>{
        console.log(res);
        if(res.data.ok){
          this.hotKeywords=res.data.hotKeywords;
        }
      })
    },
    onSearch(value){
      this.searchBook(value);
    },
    searchBook(key){
      var str=String(key)
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
  height:40px;
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
</style>
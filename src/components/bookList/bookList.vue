<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-08 14:51:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-14 11:27:07
 -->
<template>
  <section>
    <section class="main-body">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.image_url" width="100%" alt />
        </van-swipe-item>
      </van-swipe>
    </section>
    <van-grid :border="false" :column-num="4">
      <van-grid-item v-for="(item) in bookNavData" :key="item.name">
        <van-image :src="item.image_url" width="35" />
        <span class="nav-title">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
    <van-cell :title="title" is-link v-if="bookDataFirst!=''"/>
    <section class="main-body" v-if="bookDataFirst!=''">
     <van-row class="boy-hot" @click="goDetail(bookDataFirst._id)">
        <van-col span="8">
          <img :src="bookDataFirst.cover" width="90%"/>
        </van-col>
        <van-col span="16">
            <h2>{{bookDataFirst.title}}</h2>
            <p>{{bookDataFirst.longIntro}}</p>
            <van-cell :title="bookDataFirst.author" is-link style="padding:5px 0 0 0;">
  <!-- 使用 title 插槽来自定义标题 -->
              <template #right-icon>
                <van-tag type="danger">{{bookDataFirst.typeName}}</van-tag>
              </template>
            </van-cell>
        </van-col>
     </van-row>
     <van-row class="boy-hot">
        <van-col :span="8" class="last" v-for="(item, index) in bookDataList" :key="index">
          <div @click="goDetail(item.book_info._id)">
          <img :src="item.book_info.cover" alt="" width="90%">
          <h2 class="list-title">{{item.book_info.title}}</h2>
          <p>{{item.book_info.author}}</p>
          </div>
        </van-col>
     </van-row>
     <div class="img-cover" v-if="coverImgUrl!=''">
        <img :src="coverImgUrl" width="100%" alt="">
     </div>
    </section>
    <van-cell :title="hotTitle" is-link v-if="hotTitle!=''" />
    <section class="main-body" v-if="hotTitle!=''">
      <van-row>
        <van-col :span="8" v-for="(item, index) in bookHotData" :key="index">
          <img :src="item.image_url" alt="" width="90%">
        </van-col>
      </van-row>
    </section>
    <van-cell title="大家正在看" is-link v-if="bookDataFirst!=''"/>
    <section class="main-body">
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
    <div class="box"></div>
  </section>
</template>
<script>
export default {
  props: ["bookListData"],
  data() {
    return {
      bannerList: [],
      bookNavData: [],
      bookDataFirst:'',
      bookDataList:[],
      bookData:'',
      title:'',
      coverImgUrl:'',
      bookHotData:[],
      hotTitle:'',
      everybodyData:[],
    };
  },
  created() {
    setTimeout(() => {
      if(this.bookListData.banner_list!=undefined){
        this.bannerList = this.bookListData.banner_list[0].book_config;
      this.bookNavData = this.bookListData.icon[0].book_config;
      this.title=this.bookListData.home_recommend[0].name;
      this.bookData=this.bookListData;
      if(this.bookListData.book_single!=undefined){
        this.coverImgUrl=this.bookListData.book_single[0].book_config[0].image_url
      }
      this.bookDataFirst=this.bookListData.home_recommend[0].book_config[0].book_info
      this.bookDataFirst.typeName=this.bookListData.home_recommend[0].book_config[0].book_info.cat.name;
      let bookData=this.bookListData.home_recommend[0].book_config;
      for(let i=1;i<4;i++){
          this.bookDataList.push(bookData[i])
      }
      if(this.bookListData.hot_category!=undefined){
        this.bookHotData=this.bookListData.hot_category[0].book_config;
        this.hotTitle=this.bookListData.hot_category[0].name;
      }
      this.everybodyData=this.bookListData.everybody_looks;
      }
    }, 500);
  },
  methods: {
    goDetail(id){
      this.$router.push({
        path:'/bookDetail?id='+id
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.main-body {
  box-sizing: border-box;
  padding: 10px;
}
.box{
  height:50px;
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
}
.nav-title{
  font-size:15px;
  color: #666;
  display: inline-block;
  margin-top: 5px;
}
.list-title{
  font-size:15px !important;
}
</style>
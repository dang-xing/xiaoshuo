<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-09 11:14:25
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-10 17:38:49
 -->
<template>
  <section>
   <section class="main-body">
    <van-row class="boy-hot" v-if="bookInfo!=''">
        <van-col span="8">
          <img :src="bookInfo.cover" width="90%"/>
        </van-col>
        <van-col span="16">
            <h2>{{bookInfo.title}}</h2>
            <p>{{bookInfo.author}}</p>
            <div class="footer">
              <p>{{bookInfo.cat.name}}</p>
              <p>{{Math.floor(bookInfo.wordcount/10000)}}万字|<span v-if="bookInfo.isSerial==1">连载中</span></p>
            </div>
        </van-col>
     </van-row>
    </section>
    <van-cell title="简介"/>
    <section class="main-body">
      <p class="desc">{{bookInfo.longIntro}}</p>
    </section>
    <van-cell title="目录" @click="goChapter" :value="bookInfo.lastChapter" />
    <div class="line"></div>
    <van-cell title="同书推荐" is-link/>
    <section class="main-body">
      <van-row class="boy-hot">
        <van-col :span="8" class="last" v-for="(item, index) in bookDataList" :key="index">
          <div @click="goDetail(item._id)">
          <img :src="item.cover" alt="" width="90%">
          <h2 class="list-title">{{item.title}}</h2>
          <p>{{item.author}}</p>
          </div>
        </van-col>
     </van-row>
    </section>
    <section class="footer-nav">
      <van-grid clickable :column-num="3" :border="false">
        <van-grid-item icon="home-o" text="缓存全本"/>
        <van-grid-item icon="search" @click="goDetail" text="免费阅读"/>
        <van-grid-item icon="search" text="加入书架"/>
      </van-grid>
    </section>
    <div class="box"></div>
  </section>
  
</template>
<script>
import {requestBookDetails,requestBookRecommend} from '../../api/api.js'
export default {
  data() {
    return {
      bookInfo:'',
      bookDataList:'',
    }
  },
  created() {
    console.log(this.$route.query.id)
    this.getBookDetail();
  },
  methods: {
    goChapter(){
      this.$router.push({
        path:'/chapterList?id='+this.$route.query.id,
      })
    },
    goDetail(){
      this.$router.push({
        
      })
    },
    getBookDetail(){
      const id=this.$route.query.id;
      requestBookDetails({id:id}).then((res)=>{
        if(res.data.ok){
          this.bookInfo=res.data;
          requestBookRecommend({catId:res.data.cat._id,bookId:this.$route.query.id}).then((res)=>{
            console.log(res);
            if(res.data.ok){
              this.bookDataList=res.data.books;
              console.log(this.bookDataList);
            }
          })
          console.log(this.bookInfo);
        }
      })
    }
    
  },
}
</script>
<style lang="scss" scoped>
.main-body {
  box-sizing: border-box;
  padding: 10px;
}
.box{
  height: 70px;
  width: 100%;
}
.boy-hot{
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
  .footer{
    margin-top:30px;
  }
  img{
    max-height: 141px;
    min-height: 141px;
  }
}
.desc{
  font-size: 14px;
  margin:0;
  text-indent: 28px;
  line-height: 28px;
  color: #666;
}
.line{
  width: 100%;
  height: 5px;
  background-color: #f1f1f1;
}
.footer-nav{
  width: 100%;
  background-color: #fff;
  border-top:1px solid #f1f1f1;
  position: fixed;
  bottom: 0;
  left:0;
  text-align: center;
  
}

</style>
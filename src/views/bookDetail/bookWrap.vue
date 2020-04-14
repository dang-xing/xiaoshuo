<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-09 17:15:25
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-14 16:10:16
 -->
<template>
  <section class="bg">
    <div class="title">{{titles}}</div>
    <div class="box"></div>
    <section class="wrap" v-for="(item, index) in wrapInfo" :key="index">
      <h2>{{item.title}}</h2>
      <p v-html="item.body"></p>
    </section>
    <van-button class="icon-btn" type="default" @click="bookMove">加载下一章</van-button>
  </section>
</template>
<script>
import {requestWrap} from '../../api/api.js'
export default {
  data() {
    return {
      wrapInfo:[],
      index:this.$route.query.index,
      titles:'',
      number:0,
    }
  },
  created() {
    this.getWrap(this.$route.query.bookId,this.$route.query.chapterId);
  },
  methods: {
    getWrap(bookId,chapterId){
      requestWrap({bookId:bookId,chapterId:chapterId}).then((res)=>{
        console.log(res);
        if(res.data.ok){
          this.wrapInfo.push(res.data.chapter);
          for(let i=0;i<this.wrapInfo.length;i++){
             this.wrapInfo[i].body=this.wrapInfo[i].body.replace(/。/g,'。</p><p>')
          }
          console.log(this.wrapInfo.length);
          this.titles=this.wrapInfo[this.number].title;          
        }
      })
    },
    bookMove(){
      this.number++;
      ++this.index;
      localStorage.setItem('NowIndex',this.index);
      const chapterData=JSON.parse(sessionStorage.getItem('chapterData'))
      let chapterId=chapterData[this.index]._id;
      this.getWrap(this.$route.query.bookId,chapterId)
    },
  },
}
</script>
<style lang="scss" scoped>
.bg{
  background: url(../../assets/bg.jpg);
}
.wrap{
  box-sizing: border-box;
  height:100%;
  padding:0px 15px;
  p{
    font-size: 16px;
    color: #000;
    line-height: 40px;
    text-indent: 32px;
  }
  h2{
    margin:0 0 0 0;
    padding:15px 0 0 0;
    box-sizing: border-box;
    height:40px;
    font-size: 18px;
    line-height: 40px;
  }
}
.icon-btn{
  background: none;
  border:none;
  color: #ffff;
  width: 100%;
  text-align: center;
}
.title{
  width:100%;
  height:40px;
  background: url(../../assets/bg.jpg);
  position: fixed;
  top:0;
  left:0;
  font-size:14px;
  line-height: 40px;
  text-indent: 15px;
  color:#666;
}
.box{
  width: 100%;
  height:30px;
}
</style>
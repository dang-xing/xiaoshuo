/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-08 13:53:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-10 15:00:26
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/index/index.vue')
  },
  {
    path:'/bookDetail',
    name:'书籍详情',
    component:()=>import('../views/bookDetail/bookDetail.vue')
  },
  {
    path:'/chapterList',
    name:'章节目录',
    component:()=>import('../views/chapter/chapterList')
  },
  {
    path:'/bookWrap',
    name:'书籍内容',
    component:()=>import('../views/bookDetail/bookWrap')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

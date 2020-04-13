/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-08 14:59:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-13 17:24:06
 */
import {httpRequest} from './http'
export const requestBookList=params=>{
  return httpRequest('get','bookList',params,'')
}
export const requestBookDetails=params=>{
  return httpRequest('get','articlelist',params,'')
}
export const requestBookRecommend=params=>{
  return httpRequest('get','recommendList',params,'')
}
export const requestChapterList=params=>{
  return httpRequest('get','chapterList',params,'')
}
export const requestWrap=params=>{
  return httpRequest('get','chapterWrap',params,'')
}
export const requestKeyWords=params=>{
  return httpRequest('get','searchKey',params,'')
}
//搜索书籍
export const requestSearchBook=params=>{
  return httpRequest('get','searchBook',params,'')
}
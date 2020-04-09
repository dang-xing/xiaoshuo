/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-08 15:14:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-09 14:58:54
 */
const Baseurl="http://mp3.cyxlove.cn/api/articleApi/";
import axios from 'axios';
export function httpRequest(method, url, params,) {
  return axios({
    method: method,
    baseURL:Baseurl,
    url: url,
    params: params,
  });
}
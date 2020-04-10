/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-10 14:57:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-10 14:59:37
 */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'? './' : '/',
  outputDir:'dist',//构建输出目录
  assetsDir:'assets',//静态资源目录(js,css,img,fonts)
  lintOnSave:false,//是否开启eslint保存检测,有效值: true || false || 'error'
  devServer: {
    port: 8080,
   // disableHostCheck: true,
  },
}

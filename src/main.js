/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-08 13:53:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-14 15:18:11
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css'
import 'amfe-flexible'
import './assets/iconfont/iconfont.css'
Vue.use(Vant);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

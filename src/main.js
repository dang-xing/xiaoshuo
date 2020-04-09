/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: dangxing
 * @Date: 2020-04-08 13:53:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-08 17:47:18
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css'
import 'amfe-flexible'

Vue.use(Vant);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

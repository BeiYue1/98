import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/comment.css'
import API from './api/index'



import VueWechatTitle from 'vue-wechat-title';  
Vue.use(VueWechatTitle)
// Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false;
Vue.prototype.$API = API;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

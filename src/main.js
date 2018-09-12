import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/comment.css'
import API from './api/index'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
// Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false;
Vue.prototype.$API = API;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

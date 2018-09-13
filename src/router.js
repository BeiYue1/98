import Vue from 'vue'
import Router from 'vue-router'
import Index from '../src/views/index.vue'
import Tenants from '../src/views/tenants.vue'
import IndentIndex from '../src/views/indentIndex.vue'
import Persona from '../src/views/persona.vue'
import Notice from '../src/views/notice.vue'
import Stand from '../src/views/stand.vue'
import Dingding from '../src/views/dingding.vue'
import News from '../src/views/news.vue'
import System from '../src/views/system.vue'
import Bing from '../src/views/bing.vue'
import Successed from '../src/views/successed.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{   //首页(未认证)
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        pageTitle: '主页',
        keepAlive: true
      }
    },{           //认证页
      path: '/tenants',
      name:'Tenants',
      component:Tenants
    },{         //首页(认证)
      path: '/indent',
      name:'IndentIndex',
      component:IndentIndex
    },{
      path: '/persona', //个人资料
      name:'Persona',
      component:Persona
    },{
      path: '/notice', //系统公告
      name:'Notice',
      component:Notice
    },{
      path:'/stand',   //收银台
      name:'Stand',
      component:Stand
    },{
      path:'/ding',   //订单管理
      name:'Dingding',
      component:Dingding
    },{
      path:'/news',   //我的账号
      name:'News',
      component:News
    },{
      path:'/notice/system',  //系统消息
      name:'System',
      component:System
    },{
      path:'/bing',  //系统消息
      name:'Bing',
      component:Bing
    },{
      path:'/successed',
      name:'Successed',
      component:Successed
    }]
})

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
        title: '首页',
        keepAlive: true
      }
    },{           //认证页
      path: '/tenants',
      name:'Tenants',
      component:Tenants,
      meta:{
        title:'认证'
      }
    },{         //首页(认证)
      path: '/indent',
      name:'IndentIndex',
      component:IndentIndex,
      meta:{
        title:'首页'
      }
    },{
      path: '/persona', //个人资料
      name:'Persona',
      component:Persona,
      meta:{
        title:'个人资料'
      }
    },{
      path: '/notice', //系统公告
      name:'Notice',
      component:Notice,
      meta:{
        title:'系统公告'
      }
    },{
      path:'/stand',   //收银台
      name:'Stand',
      component:Stand,
      meta:{
        title:'收银台'
      }
    },{
      path:'/ding',   //订单管理
      name:'Dingding',
      component:Dingding,
      meta:{
        title:'订单管理'
      }
    },{
      path:'/news',   //我的账号
      name:'News',
      component:News,
      meta:{
        title:'我的账号'
      }
    },{
      path:'/notice/system',  //系统消息
      name:'System',
      component:System,
      meta:{
        title:'系统消息'
      }
    },{
      path:'/bing',  //系统消息
      name:'Bing',
      component:Bing,
      meta:{
        title:'系统消息'
      }
    },{
      path:'/successed',
      name:'Successed',
      component:Successed,
      meta:{
        title:'认证状态'
      }
    }]
})

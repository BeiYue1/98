import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 会员id
    memberId:'1',

    //0 成功 1进行中 2失败
    isSuccess:1,
    isOnoff:false,

    //联行1号
    isBankNum:'',
    
    // 用户信息
    dataNews:{
      nickname:'',
      id:'21',
      phone:'',
      authStatus:'',
      accountNo:'23333',
      headImageurl:'https://img02.sogoucdn.com/app/a/100520024/8ada4f6eb1004d25735b3a5b391e55a5'
    },
    // 银行和真实姓名
    infoNews:{

    }
  },
  mutations: {
    setData(state,obj){
      state.dataNews = obj;
    },
    
    setOnoff(state,onoff){
      state.isOnoff = onoff;
    },
    setInfo(state,obj){
      state.infoNews = obj;
    },
    //设置memberID
    setMemberId(state,obj){
      state.memberId = obj.memberId;
    },
    //设置状态
    setS(state,num){
      state.isSuccess = num;
    },
    setBankNum(state,num){
      state.isBankNum = num;
    }
  },
  actions: {

  }
})

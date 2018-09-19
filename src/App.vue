<template>
  <div id="app">
    <keep-alive>
      <router-view v-wechat-title="$route.meta.title" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.keepAlive"></router-view>
    <!-- <router-view/> -->
  </div>
</template>
<script>
export default {
    data(){
      return {
        authStatus:'',
      }
    },
    created(){
      // this.toLoading();
    },
    methods:{
      toLoading(){
            let url = window.location.href;
            let arr = url.split('?code=');
            if(arr.length === 1){
                window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfdfcffac7c5fab5b&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
            }else{
                let code = arr[1];
                let _arr = code.split('&');
                window.localStorage.setItem('code',code);
                code = _arr[0];
                this.$API.getWxNews(code).then( (res) =>{
                  let data = res.data.resObj;
                  this.$store.commit('setData',data);
                  
                  window.localStorage.setItem('memberId',data.id);
                  this.authStatus = data.authStatus;
                  let a = parseFloat(this.authStatus);
                  if(a === 2){
                    this.$router.push('/indent');
                  }
                }).catch( (res) =>{
                
                })
            }
          }
    }
}
</script>

<style lang="less">

</style>

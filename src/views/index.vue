<template>
    <div class="index" @click='showWraper' v-show="isIndex">
        <div class="index-cont">
                <img :src="dataNews.headimgurl" alt="">
                <div class="index-news">
                    <p>{{ dataNews.nickname }}</p>
                    <p>
                        <a href="javaScript:;"></a>
                    </p>
                </div>
            </div>
          <div class="index-nav">
              <div>
                  <a class="sl" href="javaScript:;">
                      <span>收银台</span><span>便捷收银</span>
                  </a>
              </div>
              <div>
                  <a class="dd" href="javaScript:;">
                      <span>订单管理</span><span>查看流水</span>
                  </a>
              </div>
              <div>
                  <a class="sh" href="javaScript:;">
                      <span>商户认证</span><span>认证信息</span>
                  </a>
              </div>
              <div>
                  <a class="zh" href="javaScript:;">
                      <span>账户信息</span><span>结算账户</span>
                  </a>
              </div>
          </div>
          <footer class="index-footer">
              <div>
                  <router-link to="/tenants"> 个人资料 </router-link>
              </div>
              <div>
                  <a href="javaScript:;">系统公告</a>
              </div>
          </footer>

          <div class="wrap" v-show="isShow">
            <div>
              <p>请先商务认证</p>
              <button @click='toRz'>确定</button>
            </div>
          </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name:"index",
        computed:{
          ...mapState(["dataNews"])
        },
        data () {
            return {
              authStatus:'' , //认证状态 2--认证
              isShow:false,
              isIndex:false,  //上线需改为false
            }
        },
        beforeRouteEnter (to, from, next) {
          if(from.path === '/indent'){
            to.path = '/indent';
          }
          next();
        },
        mounted(){
          let wrap = document.getElementsByClassName('wrap')[0];
          wrap.style.height = window.innerHeight + 'px';
          let _this = this;
          setTimeout( () => {
            _this.isIndex = true;
          },1000);
        },
        methods:{
          showWrap(){
            let a = parseFloat(this.authStatus);

            if(a === 2){
              this.$router.push('/indent');
            }
          },
          showWraper(){
            this.isShow = true;
          },
          // 认证
          toRz(){
            this.$router.push('/bing');
          },
          
        }
    }
</script>

<style lang="less">

.index-header{
  background-color: #333333;
  height: 45px;
  color: white;
  text-align: center;
  line-height: 45px;
  position: relative;
  i{
    position: absolute;
    top: 0;
    width: 65px;
    height: 100%;
  }
  i:first-of-type{
    background: url(../assets/img/toLeft.png) no-repeat left center;
    background-size: 16px;
    left: 10px;
  }
  i:last-of-type{
    background: url(../assets/img/ml.png) no-repeat right center;
    background-size: 25px;
    right: 10px;
  }
}
.index-cont{

  padding-left: 10px;
  padding-top: 30px;
  background: url(../assets/img/个人中心背景@2x.png) no-repeat;
  background-size: 100%;
  font-size: 0;
  padding-bottom: 100px;
 img{
    border-radius: 50%;
    width: 72px;
    height: 72px;
 }
  .index-news{
    display: inline-block;
    font-size: 17px;
    color: white;
    padding-left: 12px;
    padding-top: 8px;
    p:nth-of-type(2){
      height: 18px;
      width: 56px;
      background: url(../assets/img/未认证@3x.png) no-repeat;
      background-size: cover;
      margin-top: 10px;
      a{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
.index-nav{
  width: 90%;
  background-color: white;
  margin: 0 auto;
  border-radius: 10px;
  margin-top: -110/2px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  div{
    width: 50%;
    height: 182/2px;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    border-right: none;
    border-bottom: none;
    a {
      display: block;
      padding-left: 66px;
      padding-top: 29px;
      span {
        display: block;
        color: #050505;
      }
      span:nth-of-type(2) {
        color: #b8b8b8;
      }
    }
    .sl{
      background: url(../assets/img/收银台@3x.png) no-repeat 15px 29px;
      background-size: 40px 40px;
    }
    .dd{
      background: url(../assets/img/订单管理@3x.png) no-repeat 15px 29px;
      background-size: 40px 40px;
    }
    .sh{
      background: url(../assets/img/商户认证@3x.png) no-repeat 15px 29px;
      background-size: 40px 40px;
    }
    .zh{
      background: url(../assets/img/账户信息@3x.png) no-repeat 15px 29px;
      background-size: 40px 40px;
    }
  }


  div:first-of-type{
    border-top: none;
    border-left: none;
  }
  div:nth-of-type(3){
    border-left: none;

  }
  div:nth-of-type(2){
    border-top: none;
  }

}
.index-footer{
  background-color: white;
  margin-top: 10px;
  div{
    height: 50px;
    a{
      display: block;
      width: 70px;
      height: 100%;
      padding-left: 33px;
      background-color: red;
      margin-left: 33px;
      line-height: 50px;
      font-size: 14px;
    }
  }
  div:first-of-type{
    border-bottom: 1px solid #f5f5f5;
    a{
      background:url(../assets/img/个人资料@3x.png) no-repeat left center;
      background-size: 25px;
    }
  }
  div:nth-of-type(2){
    a{
      background:url(../assets/img/系统公告@3x.png) no-repeat left center;
      background-size: 25px;
    }
  }
}
.wrap{
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1000px;
  background-color: rgba(0,0,0,.5);
  div{
    width: 80%;
    padding-top: 30px;
    margin: 230px auto;
    background-color: white;
    text-align: center;
    border-radius: 10px;
    p{
      color: black;
      font-size: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #cccccc;
    }
    button{
      width: 100%;
      height: 50px;
      font-size: 20px;
      background-color: orange;
      color: white;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
}
</style>

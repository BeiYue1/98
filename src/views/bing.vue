<template>

    <div class="bingding-div">
        <ul>
            <li><span>手机号</span><input  v-model="val" type="text" placeholder="请输入手机号"></li>
            <li><span>验证码</span><input v-model="vals" type="text" placeholder="请输入验证码"><button :class="{select:isBtn}" @click="find">{{ btn }}</button></li>
        </ul>
        <button @click="toTel" :class="{fselect:true}" class="footer-btn">立即绑定</button>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name:"bing",
        data () {
            return {
                val:'',
                vals:'',
                btn:'获取验证码',
                isBtn:true,
                list:null,
                
            }
        },
        computed:{
            ...mapState(["dataNews","dataInfo","memberId"]),
        },
        methods:{
            // 获取验证码
            find(){
                let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
                let isPhone = phoneCodeVerification.test(this.val);
                let isBtn = true;
                if(isPhone && this.isBtn){
                    let num = 60 ; 
                    let timer = null;
                    let _this = this;
                    _this.isBtn = false;
                    timer = setInterval(function(){
                        num--;
                        if(num <= 0 ){
                            clearInterval(timer);
                            _this.isBtn = true;
                            _this.btn = '获取验证码';
                        }else{
                            _this.btn = `剩余${num}秒`;
                        }
                        
                    },1000)
                    this.$API.getTelNews(this.val).then((res) =>{
                    });
                }else{
                    if(this.isBtn){
                        alert('请检查手机号是否输入正确？');
                    }
                }
            },
            toTel(){
                
                //TODO:memberID需修改
                let phone = this.val.trim();
                let smsCode = this.vals.trim();
                let memberId = window.localStorage.memberId;
                
                this.$API.getBingTel({
                    memberId,
                    phone,
                    smsCode
                }).then( (res) =>{
                    if( res.data.resCode === "success" ){
                        this.$router.push('/tenants');
                    }else{
                        alert(res.data.resMsg);
                    }
                })
            }
        },
        components: {

        }
    }
</script>

<style lang="less" scoped>
.bingding-div{
  margin-top: 10px;
  ul{
    background-color: white;
    li{
      margin: 0 10px;
      height: 50px;
      line-height: 50px;
      position: relative;
      border-bottom: 1px solid #eeeeee;
      span{
        padding-left: 10px;
      }
      input{
        border: none;
        height: 100%;
        vertical-align: top;
        padding-left: 35px;
        color: #333333;
        font-size: 15px;
      }
      input::placeholder{
        color: #999999;
        font-size: 15px;
      }
      button{
        position: absolute;
        width: 75px;
        height: 25px;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto 0;
        background-color: #cccccc;
        border: none;
        color: white;
        font-size: 12px;
        border-radius: 5px;
      }
      .select{
          background-color:#fe5728;
      }
    }
    li:last-of-type{
      border-bottom: none;
    }
  }
  .footer-btn{
    display: block;
    border: none;
    width: 95%;
    height: 45px;
    margin: 50px auto;
    font-size: 17px;
    color: white;
    border-radius: 10px;
  }
  .fselect{
      background-color: #fe5728;
  }

}
 
</style>

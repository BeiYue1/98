<template>
    <div class="tenants">
        <header class="tenants-header">
            商户认证<em v-show="isOnoff">(请填写真实用户信息)</em> 
        </header>
        <ul class="tenants-ul" v-show="isOnoff">
            <li>
                <span>商户名</span><em><input v-model="merName" type="text" placeholder="请输入商户名"></em>
            </li>
            <li>
                <span>真实姓名</span><input v-model="name" type="text" placeholder="请输入真实姓名">
            </li>
            <li>
                <span>身份证号</span><input v-model="idCard" type="text" placeholder="请输入身份证号">
            </li>
            <li>
                <span>银行预留手机号</span><input v-model="tel" type="text" placeholder="请输入手机号">
            </li>
            <li>
                <span>联行号</span><input ref="bankNum" @blur="setNum" :value="isBankNum" type="text" placeholder="请输入联行号">
            </li>
            <li>
                <span>结算账号</span><input v-model="bankCard" type="text" placeholder="请输入结算账号">
            </li>
            <li class="no-ten">
                <span>银行名</span><div @click="showYh"><strong v-show="!isSelect">请选择银行</strong> <strong v-show="isSelect">{{ dataList[ind].bankName }} </strong> </div>
            </li>
        </ul>

        <ul class="tenants-ul tenants-ul-ul" v-show="!isOnoff">
            <li>
                <span>商户名</span><input disabled type="text" :value="newsList.merName">
            </li>
            <li>
                <span>真实姓名</span><input disabled type="text" :value="newsList.realName">
            </li>
            <li>
                <span>身份证号</span><input disabled type="text" :value="newsList.idCard"> 
            </li>
            <li>
                <span>银行预留手机号</span><input disabled type="text" :value="newsList.mobile">
            </li>
            <li>
                <span>联行号</span><input disabled type="text" :value="newsList.subBankCode">
            </li>
            <li>
                <span>结算账号</span><input disabled type="text" :value="newsList.accountNo">
            </li>
            <li class="no-ten">
                <span>银行名</span><input disabled type="text" :value="newsList.bankName">
            </li>
        </ul>

        <div ref="bscroll" class="tenants-yh" v-show="isYh">
            
            <div class="tenants-yh-ul">
                <p @click="changeIndex(index)" v-for="(item,index) in dataList" :key="index"> {{ item.bankName }} <i class="noChecked" :class="{ select: ind === index }"></i> </p>
                <button @click="hideYh"> 确定 </button>
            </div>
            
        </div>

        <button v-show="isOnoff" class="tenants-btn" @click="findBank" >
            <a href="javaScript:;">查询联行号</a>
        </button>

        <button class="tenants-btn" @click="submited" v-show="isOnoff">
            <a href="javaScript:;">提交</a>
        </button>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import jsonp from 'jsonp';
    import BScroll from "better-scroll";
    export default {
        name:"tenants",
        data () {
            return {
                ind:0,
                dataList:[{
                    bankName:"工商银行"
                }],
                //联行号
                valList:[],
                //银行号
                cratList:null,
                name:'',
                idCard:'',
                tel:'',
                bankNum:'',
                bankCard:'',
                
                //银行名
                thisBankName:'工商银行',

                isYh:false,
                isSelect:false,
                onoff:true,
                bank:false,
                val1:'',
                val2:'',
                indent:0,  //控制联行号
                bankNum:null,
                merName:'', //商户名
                newsList:[], //个人信息
                
            }
        },
        beforeCreate(){
            //获取银行列表
            this.$API.getBank().then((result) => {
                let data = result.data.resObj;
                this.dataList = data;
            });
        },
        created(){
            console.log(this.isBankNum);
            if(Number(this.dataNews.authStatus) === 2){  //已认证
                this.$store.commit('setOnoff',false);
                let memberId = window.localStorage.memberId;
                this.$API.getHyNews(memberId).then((result) => {
                    let data = result.data.resObj;
                    this.newsList = data;
                   
                }).catch((err) => {
                    console.log(err);
                });
            }else{
                this.$store.commit('setOnoff',true);
            }
        },
        beforeRouteLeave(to, from, next) {
            if (to.path === "/") {
                to.meta.keepAlive = true;
            } else {
                to.meta.keepAlive = false;
            }
            next();
        },
        methods:{
            showYh(){
                this.isYh = true;
                this.$nextTick(() => {
                    let bscrollDom = this.$refs.bscroll;
                
                    this.aBScroll = new BScroll(bscrollDom,{
                        click:true,
                    });
                }) ;
            },
            setNum(){
                this.$store.commit('setBankNum',this.$refs.bankNum.value);
            },
            hideYh(){
                // 获取数据
                this.isYh = false;
                this.isSelect = true;
                this.cratList = this.dataList[this.ind];
            },
            changeIndex(index){
                this.ind = index;
            },
            findBank(){
                this.$router.push('find/bank');
                this.valList = [];
            },
            // TODO:需对接口
            submited(){
                let memberId = window.localStorage.memberId;
                let accountNo = this.bankCard;
                let bankCode = `${this.cratList.code}-${this.cratList.bankName}`;
                let idCard = this.idCard;
                let merName = this.merName;
                let mobile = this.tel;
                let realName = this.name;
                let subBankCode = this.isBankNum;
                if(accountNo && idCard && merName && mobile && realName && subBankCode){
                    this.$API.getList({
                        accountNo,
                        bankCode,
                        idCard,
                        memberId,
                        merName,
                        mobile,
                        realName,
                        subBankCode,
                    }).then( (res) =>{
                        let data = res.data;
                        if( data.resCode === 'success' ){
                            this.$store.commit('setS',0);
                            this.$router.push('/successed');
                        }else{
                            alert(data.resMsg);         
                        }
                    }).catch( (res) =>{
                        alert('请填写正确的内容!');
                    })
                }else{
                    alert('请输入完整的信息!');
                }
                
            }
            
        },
        computed:{
            ...mapState(["dataNews","memberId","isOnoff","isBankNum"]),
        },
        mounted(){
            let tenant = document.getElementsByClassName('tenants')[0];
            let tenants = document.getElementsByClassName('tenants-yh')[0];
            tenant.style.height = window.innerHeight + 'px';
            tenants.style.height = window.innerHeight + 'px';
            
        }
    }
</script>

<style lang="less" scoped>
.tenants{
    overflow: hidden;
}
.tenants-header{
  height: 30px;
  line-height: 30px;
  color: #999999 ;
  font-size: 15px;
  background-color: #f5f5f5;
  padding-left: 10px;
}
.tenants-ul{
  background-color: white;
  padding: 0 10px;
  li{
    line-height: 50px;
    height: 50px;
    border-bottom: 1px solid #cccccc;
    font-size: 15px;
    color: #333333;
    position: relative;
    background: url(../assets/img/ten.jpg) no-repeat 5px center;
    background-size: 5px 5px;
    div{
      display: inline-block;
      color: #999999;

      .tenants-bottom{
        position: absolute;
        width: 13px;
        height: 13px;
        top: 0;
        bottom: 0;
        margin: auto 0 ;
        right: 0;
        background: url(../assets/img/商户认证下拉@3x.png) no-repeat;
        background-size: 100%;
      }
    }
    span{
      display: inline-block;
      vertical-align: top;
      width: 143px;
      margin-left: 12px;
    }
    em{
      position: absolute;
      top: 0;
      right: 0;
    }
    input{
      height: 50px;
      font-size: 15px;
      border: 1px solid transparent;
      vertical-align: top;
    }
    input::placeholder{
      font-size: 15px;
      color: #999999;
    }
  }
  li:last-of-type{
    background: white;
    border-bottom: none;
  }
}
.tenants-ul{
    li{
        display: flex;
        span{
            flex: 1;
        }
        input{
            flex: 2;
            text-align: right;
        }
    }
}
.tenants-btn{
  display: block;
  width: 90%;
  height: 45px;
  background-color: #fe5728;
  margin: 10px auto;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 15px;
  a{
    color: white;
    display: block;
    width: 100%;
    height: 100%;
    line-height: 45px;
  }
}
.tenants-yh{
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    background-color:  rgba(0, 0, 0, 0.3);
    .tenants-yh-ul{
        width: 90%;
        background-color: white;
        margin: 30px auto;
        padding-bottom: 10px;
        button{
            width: 100px;
            height: 30px;
            display: block;
            margin: 10px auto 0 auto;
            border-radius: 10px;
            background-color: #fe5728;
            color: white;
        }
        p{
            line-height:30px;
            padding-left: 30px;
            position: relative;
            border-bottom: 1px solid #cccccc;
            i{
                display:inline-block;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                border: 1px solid #cccccc;
                vertical-align: middle;
                position:absolute;
                top: 7px;
                right: 20px;
            }
            .select{
                background-color: red;
            }
        }
    }
}
.findNum{
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position:absolute;
    top: 0;
    left: 0;
    .findNum-cont{
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 30px;
        background-color: white;
        position: absolute;
        top:100px;
        left: 12%;
        div{
            margin-bottom: 10px;
            display: flex;
            
            span{
                display: inline-block;
                width: 3rem;
                text-align: right;
                height: 30px;
                line-height: 30px;
                margin-right: 10px;
                flex: 1;
            }
            em{
                flex: 3;
                padding-left: 10px;
                min-height: 30px;
                border: 1px solid #cccccc;
                strong{
                    border-bottom: 1px solid #cccccc;
                    display: block;
                    margin: 0 5px;
                }
                .strongSelect{
                    background-color: #333333;
                    color: white;
                }
                i{
                    font-size: 12px;
                    display: block;
                }
            }
            .span{
                vertical-align: top;
            }
            input{
                width: 100%;
                border: none;
            }
        }
         .click-btn{
            width: 100px;
            height: 30px;
            border-color: transparent;
            color: white;
            border-radius: 5px;
            margin: 0 10px;
            background-color: orangered;
        }
    }
    .find-bank{
        font-size: 12px;
        line-height: 32px;
        position: relative;
        .find-bank-bottom{
            position:absolute;
            top: 15px ;
            right: 10px;
            width: 10px;
            height: 10px;
            background: url(../assets/img/商户认证下拉@2x.png) no-repeat;
            background-size: 100%;
        }
        .find-strong{
            position: absolute;
            width: 100%;
            top: 32px;
            left: -5px;
            background: #eee;
            height: 200px;
            overflow: hidden;
            strong{
                display: block;
                margin: 0;
            }
            
            i{
                width: 100%;
                display: block;
                text-indent:10px;
                border: 1px solid #cccccc;
                margin-top: -1px;
                margin-left: -1px;
            }
        }
    }
}
</style>

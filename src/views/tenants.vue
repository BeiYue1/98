<template>
    <div class="tenants">
        <header class="tenants-header">
            商户认证
        </header>
        <ul class="tenants-ul" v-show="onoff">
            <li>
                <span>商户名</span><em> {{ dataNews.nickname }} </em>
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
                <span>联行号</span><input v-model="bankNum" type="text" placeholder="请输入联行号">
            </li>
            <li>
                <span>结算账号</span><input v-model="bankCard" type="text" placeholder="请输入结算账号">
            </li>
            <li class="no-ten">
                <span>银行名</span><div @click="showYh"><strong v-show="!isSelect">请选择银行</strong> <strong v-show="isSelect">{{ dataList[ind].bankName }} </strong> </div>
            </li>
        </ul>

        <ul class="tenants-ul tenants-ul-ul" v-show="!onoff">
            <li>
                <span>商户名</span><em> {{ dataNews.nickname }} </em>
            </li>
            <li>
                <span>真实姓名</span><input disabled type="text" :value="infoNews.realName">
            </li>
            <li>
                <span>身份证号</span><input disabled type="text" :value="infoNews.idCard"> 
            </li>
            <li>
                <span>银行预留手机号</span><input disabled type="text" :value="infoNews.mobile">
            </li>
            <li>
                <span>联行号</span><input disabled type="text" :value="infoNews.bankName">
            </li>
            <li>
                <span>结算账号</span><input disabled type="text" :value="infoNews.accountNo">
            </li>
            <li class="no-ten">
                <span>银行名</span><input disabled type="text" :value="infoNews.bankName">
            </li>
        </ul>

        <div class="tenants-yh" v-show="isYh">
            <div class="tenants-yh-ul">
                <p @click="changeIndex(index)" v-for="(item,index) in dataList" :key="index"> {{ item.bankName }} <i class="noChecked" :class="{ select: ind === index }"></i> </p>
                <button @click="hideYh"> 确定 </button>

            </div>
        </div>

        <button class="tenants-btn" @click="findBank" >
            <a href="javaScript:;">查询联行号</a>
        </button>

        <div class="findNum" v-show="bank">
            <div class="findNum-cont">
                <div> <span>银行</span> <input v-model="val1" placeholder="如：中国农业银行" type="text"> </div>
                <div> <span>地址</span> <input v-model="val2" placeholder="如：花岗" type="text"></div>
                <div> <span class="span">联行号</span> <em>
                        <strong @click="changeBank(index)" :class="{strongSelect:index === indent}" v-for="(item,index) in valList" :key="index"> 
                            <i>{{ item.branchBankName }}</i> 
                            <i>{{ item.subBankCode }}</i>
                        </strong>
                    </em></div>
                <div><button @click="query" class="click-btn">点击查询</button><button class="click-btn" @click='hideBank'>确定</button></div>
                
            </div> 
        </div>

        <button class="tenants-btn" @click="submit" v-show="onoff">
            <a href="javaScript:;">提交</a>
        </button>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import jsonp from 'jsonp';
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

                isYh:false,
                isSelect:false,
                onoff:true,
                bank:false,
                val1:'',
                val2:'',
                indent:0,  //控制联行号
                bankNum:null,
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
            if(Number(this.dataNews.authStatus) === 2){  //已认证
                this.onoff = false;
            }else{                                          //未认证
                this.onoff = true;
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
                this.bank = true;
                this.valList = [];
            },
            hideBank(){
                
                if(this.valList.length === 0){
                    this.bank = false;
                    return;
                }
                this.val1 = '';
                this.val2 = '';
                this.bank = false;
                this.bankNum = this.valList[this.indent].subBankCode
                // }
            },
            changeBank(index){
                this.indent = index;
            },
            // 查询航联号
            query(){
                this.$API.getSubBankList({
                    bankName:this.val1,
                    keywords:this.val2,
                }).then( (res) =>{
                    this.valList = res.data.resObj;
                    
                });
            },
            // TODO:需对接口
            submit(){
                console.log(this.cratList);
                if(this.cratList){
                    let accountNo = this.bankCard;
                    let bankCode = `${this.cratList.code}-${this.cratList.bankName}`;
                    let idCard = this.idCard;
                    let memberId = this.memberId;
                    let merName = this.dataNews.nickname;
                    let mobile = this.tel;
                    let realName = this.name;
                    let subBankCode = this.bankNum;
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
                        let data = res.data.resMsg;
                        alert(data); 
                    });
                }else{
                    alert('请填写正确的信息');
                }
            }
        },
        computed:{
            ...mapState(["dataNews","infoNews","memberId"]),
        },
        mounted(){
            let tenants = document.getElementsByClassName('tenants-yh')[0];
            let findNum = document.getElementsByClassName('findNum')[0];
            findNum.style.height = window.innerHeight + 'px';
            tenants.style.height = window.innerHeight + 'px';
        }
    }
</script>

<style lang="less" scoped>
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
      height: 100%;
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
.tenants-ul-ul{
    input{
        padding-left: 4%;
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
        width: 80%;
        padding-top: 30px;
        background-color: white;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        div{
            margin-left: 30px;
            margin-bottom: 10px;
            span{
                display: inline-block;
                width: 3rem;
                text-align: right;
                height: 30px;
                line-height: 30px;
                margin-right: 10px;
            }
            em{
                display: inline-block;
                width: 191px;
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
                padding-left: 20px;
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
}
</style>

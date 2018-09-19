<template>
    <div class="find-bank">
        <ul>
            <li @click="show">
                <span>银行</span><div class="find-div">
                    <em>{{ bank }} <i class="find-icon"></i> </em>
                     <div class="wrapper" ref="bscroll" v-show="isShow">
                        <div class="content">
                            <p @click.stop="select(item)" v-for="(item,index) in list" :key="index">{{ item }}</p>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <span>地址</span><div class="find-div">
                    <input v-model="dz" type="text" placeholder="请输入要查询的地址">
                </div>
            </li>
            <li>
               <div class="find-div">
                    <p @click="sureIndex(index)" :class="{'p2':index === ind }" class="p1" v-for="(item,index) in bankList" :key="index">{{ item.branchBankName }} {{ item.subBankCode }}</p>
                </div>
            </li>
            <li>
                <button @click="cx">查询</button><button @click="sureBank">确定</button>
            </li>
        </ul>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
    data () {
        return {
            list:[],
            isShow:false,
            bank:'工商银行',
            bankList:[],
            dz:'',
            ind:0,
        }
    },
    created(){
        this.$API.getBankList().then( res =>{
            this.list = res.data.resObj;
        } )
    },
    methods:{
        select(obj){
            this.bank = obj;
            this.isShow = false;
        },
        show(){
            this.isShow = true;
            this.$nextTick(() => {
                let bscrollDom = this.$refs.bscroll;
                this.aBScroll = new BScroll(bscrollDom,{
                    click:true,
                });
            }) ;
        },
        cx(){
            if(this.dz){
                this.$API.getSubBankList({
                    bankName:this.bank,
                    keywords:this.dz,
                }).then( (res) =>{
                    this.bankList = res.data.resObj;
                });
            }
        },
        sureIndex(index){
            this.ind = index;
        },
        sureBank(){
            if(this.bankList.length !== 0 ){
                this.$store.commit('setBankNum',this.bankList[this.ind].subBankCode);
            }
            this.$router.push('/tenants');
            
        }
    },
    mounted(){
    },
    components: {

    }
}
</script>

<style lang="less" scoped>
.find-bank{
    ul{
        font-size: 14px;
        width: 80%;
        background: white;
        margin: 10px auto;
        li{
            min-height: 30px;
            line-height: 30px;
            border: 1px solid #cccccc;
            margin-top: -1px;
            display: flex;
            position: relative;
            span{
                flex: 1;
                text-align: center;
                border-right: 1px solid #cccccc;
                box-sizing: border-box;
            }
            .find-div{
                flex: 3;
                padding-right: 20px;
                padding-left: 20px;
                position: relative;
                .wrapper{
                    width: 100%;
                    height: 400px;
                    text-indent: 20px;
                    background-color: #eeeeee;
                    position: absolute;
                    top: 30px;
                    left: 0;
                    overflow: hidden;
                    z-index: 999;
                    p{
                        border: 1px solid #cccccc;
                        margin-top: -1px;
                        font-size: 12px;
                    }
                }
                .find-icon{
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    background: url(../assets/img/商户认证下拉@3x.png) no-repeat right center;
                    background-size: 100%;
                }
                input{
                    border: none;
                    // float: right;
                }
                .p1{
                    border-bottom: 1px solid #cccccc;
                }
                .p2{
                    background-color: black;
                    color: white;
                }
            }

            button{
                flex: 1;
                margin: 0 10px;
            }
            button:nth-of-type(2){
                background-color: aqua;
                color: white;
            }
        }
        li:last-of-type{
            padding: 10px 0;
        }
        
    }
}

</style>

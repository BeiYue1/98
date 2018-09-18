<template>
    <div class="dingding">
        <header id="manage-header" class="manage-header">
            <div @click="changeIndex(subIndex)" :class="{ success:ind === subIndex }" v-for="(subItem,subIndex) in parent" :key="subIndex"> {{ subItem.title }} </div>
        </header>
        <!--成功-->
        <ul class="manage-cont">
            <li v-for="(item,index) in data" :key="index">
                <p>{{ item.mchName }}</p>
                <p>{{ item.createTime }}</p>
                <span>{{ item.orderAmount }} </span>
            </li>
            
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name:"dingding",
        data () {
            return {
                parent:[{
                    title:"交易成功"
                },{
                    title:"交易中"
                },{
                    title:"交易失败"
                },{
                    title:"待支付"
                }],
                ind:0,
                // TODO:待定
                data:[],
                allData:[]
            }
        },
        computed:{
          ...mapState(["memberId"])
        },
        beforeCreate(){
            let memberId = window.localStorage.memberId;
            for(let i = 0 ; i < 4 ; i++){
                this.$API.getAccount({
                    memberId:memberId,
                    status: i,
                }).then( (res) =>{
                    let data = res.data.resObj
                    this.allData[i] = data;
                    this.data = this.allData[0];
                })
            }
            
        },
        methods:{
            changeIndex(index){
                this.data = this.allData[index];
                this.ind = index;
            }
        }
    }
</script>

<style lang="less" scoped>
.manage-header{
  height: 60px;
  background-color: white;
  display: flex;
  margin-bottom: 10px;
  div{
    flex: 1;
    text-align: center;
    line-height: 60px;
    color: #333333;
    font-size: 15px;
  }
  .success{
    color: #fe5728;
  }
}
.manage-cont{
  background-color: white;
  li{
    height: 44px;
    padding-left: 10px;
    border-bottom: 1px solid #eeeeee;
    padding-top: 6px;
    position: relative;
    line-height: 50px;
    p{
      font-size: 12px;
      color: #333333;
      line-height: 22px;
    }
    p:nth-of-type(2){
      color: #999999;
    }
    span{
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 12px;
      font-weight: bold;
      color: #333333;
    }
  }
}
.manage-ing,.manage-fail{
  display: none;
}
 
</style>

<template>
    <div class="my-account">
        <ul>
            <li>
                <span>姓名</span>
                <em>{{ dataList.realName }} </em>
            </li>
            <li>
                <span>身份证号</span>
                <em>{{ dataList.idCard }} </em>
            </li>
            <li>
                <span>手机号</span>
                <em>{{ dataList.mobile }} </em>
            </li>
            <li>
                <span>结算银行</span>
                <em> {{ dataList.bankName }}</em>
            </li>
            <li>
                <span>结算卡</span>
                <em>{{ dataList.accountNo }}</em>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
                dataList:{

                }
            }
        },
        computed:{
          ...mapState(["memberId"])
        },
        created(){
           
            let memberId = window.localStorage.memberId;
            this.$API.getHyNews(memberId).then((result) => {
                let data = result.data.resObj;
                this.dataList = data;
            }).catch((err) => {
                console.log(err);
            });
        },
        components: {

        }
    }
</script>

<style lang="less" scoped>
.my-account{
  margin-top: 10px;
  ul{
    background-color: white;
    li{
      position: relative;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      border-bottom: 1px solid #eeeeee;
      margin: 0 10px;
      span{
        color: #333333;
        font-size: 15px;
      }
      em{
        position: absolute;
        top: 0;
        right: 0;
        color: #999999;
        font-size: 15px;
      }
    }
    li:last-of-type{
      border-bottom: none;
    }
  }
}
</style>

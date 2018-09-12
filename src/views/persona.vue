<template>
    <div class="persona">
        <div class="per-cont">
            <ul>
                <li class="tx">
                    <span>头像</span>
                    <div>
                        <img class="tx-img" :src="myNews.headimgurl" alt="">
                    </div>
                </li>
                <li>
                    <span>实名认证</span>
                    <div>{{ myNews.realName }}<img class="sm-img" src="../assets/img/已实名@2x.png"></div>
                </li>
                <li>
                    <span>用户昵称</span>
                    <div>{{ myNews.nickname }} </div>
                </li>
                <li>
                    <span>手机号</span>
                    <div> {{ myNews.phone }} </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name:"persoan",
        data () {
            return {
                myNews:[],
            }
        },
        computed:{
          ...mapState(["memberId"])
        },
        created(){
            //TODO:获取用户的实名信息
            this.$API.getMyNews(this.memberId).then((res) => {
                this.myNews = res.data.resObj;
                console.log(this.myNews);
            }).catch((err) => {
                console.log(err);
            });
        },
        computed:{
            ...mapState(["dataNews"])
        },
        components: {

        }
    }
</script>

<style lang="less" scoped>
.per-cont{
  margin-top: 10px;
  ul{
    li{
      height: 78px;
      border-bottom: 1px solid #eeeeee;
      background-color: white;
      line-height: 78px;
      padding-left: 13px;
      position: relative;
      span{
        font-size: 15px;
        color: #333333;
      }
      div{
        position: absolute;
        top: 0;
        right: 13px;
        .tx-img{
          width: 53px;
          height: 53px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .sm-img{
          width: 40px;
          vertical-align: middle;
          margin-left: 5px;
        }
      }
    }
    li:not(.tx){
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>

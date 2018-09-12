<template>
    <div class="notice">
      <ul>
          <li>
            <router-link to="/notice/system">
                <img src="../assets/img/系统消息@3x.png" alt=""><span>系统信息</span>
            </router-link>
          </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name:"notice",
        data () {
            return {
                
            }
        },
        components: {

        }
    }
</script>

<style lang="less" scoped>
.notice{
  margin-top: 10px;
  ul{
    background-color: white;
    li{
      height: 60px;
      line-height: 60px;
      padding-left: 10px;
      a{
        width: 100%;
        height: 100%;
        display: block;
      }
      img{
        width: 35px;
        height: 35px;
        border-radius: 10px;
        vertical-align: middle;
      }
      span{
        margin-left: 8px;
        font-size: 15px;
        color: #333333;
      }
    }
    li:first-of-type{
      border-bottom: 1px solid #eeeeee;
    }
  }
}
 
</style>

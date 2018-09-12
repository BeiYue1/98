<template>

    <div class="system">
        <ul class="system-ul">
            <li v-for="( item,index ) in dataList" :key="index">
                <h3>{{ item.title }}</h3>
                <p>{{ item.content }}</p>
                <em>{{ item.createTime }}</em>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name:'system',
        data () {
            return {
                dataList:[],
            }
        },
        created(){
            // 获取系统消息
            
            this.$API.getNews({}).then( (res) =>{
                this.dataList = res.data.resObj;
            })
        },
        components: {

        }
    }
</script>

<style lang="less" scoped>
.system-ul{
  li{
    padding-left: 18px;
    padding-right: 15px;
    padding-bottom: 10px;
    background-color: white;
    border-bottom: 1px solid #eeeeee;

    h3{
      font-size: 15px;
      font-weight: bold;
      line-height: 30px;
      margin-bottom: 3px;
    }
    p{
      font-size: 13px;
      color: #666666;
      margin-bottom: 12px;
    }
    em{
      font-size: 12px;
      color: #333333;

    }
  }
}
 
</style>

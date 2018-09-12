<template>
    <div class="checkstand">
        <div class="checkstand-text">
            <input ref="input" @focus="showM" @input="setM" type="text" placeholder="请输入支付金额">
            <span>￥<em>{{ monly }}</em></span>
        </div>
        <div class="checkstand-cont">
            支付方式<em>请选择正确的支付方式</em>
        </div>
        <ul>
            <li @click="changeIndex(index)" v-for="(item,index) in dataList" :key="index">
              {{ item.name }}<i :class="{select:(index === ind)}"></i>
            </li>
        </ul>
        <button @click="zf" class="checkstand-zf">立即支付</button>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
              monly:0,
              ind:0,
              dataList:[{
                name:'微信支付'
              },{
                name:'快捷支付'
              }]
            }
        },
        methods:{
          setM(){
            this.monly = this.$refs.input.value; 
            if(this.$refs.input.value === ''){
                this.monly = 0; 
            }
          },
          showM(){
            this.$refs.input.value = '';
            this.monly = 0;
          },
          changeIndex(index){
            this.ind = index;
          },
          computed:{
            ...mapState(["memberId"])
          },
          // TODO:接口报错
          zf(){
            this.$API.getMonly({
              amount:'123',
              memberId:this.memberId
            }).then( (res) =>{
              console.log(res);
            })
          }
        }
        
    }
</script>

<style lang="less" scoped>

 .checkstand{
  .checkstand-text{
    height: 112px;
    background-color: white;
    padding-left: 23px;
    padding-top: 20px;
    position: relative;
    input{
      width: 100%;
      border: none;
      font-size: 30px;
    }
    input::placeholder{
      color: #999999;
      font-size: 15px;
    }
    span{
      position: absolute;
      right: 20px;
      bottom: 16px;
      font-size: 30px;
      color: #ff5628;
    }
  }

  .checkstand-cont{
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    background-color: #f5f5f5;
    font-size: 15px;
    color: #333333;
    em{
      font-size: 12px;
      color: #999999;
      vertical-align: top;
      margin-left: 10px;
    }
  }
  ul{
    background-color: white;
    li{
      height: 50px;
      line-height: 50px;
      padding-left: 43px;
      border-bottom: 1px solid #eeeeee;
      position: relative;
      i{
        position: absolute;
        width: 18px;
        height: 18px;
        background: url(../assets/img/选择-未选@3x.png) no-repeat;
        background-size: 100%;
        top: 0;
        bottom: 0;
        margin: auto 22px;
        right: 0;
      }
      .select{
        background: url(../assets/img/选择-已选@3x.png) no-repeat;
        background-size: 100%;
      }
    }
    li:first-of-type{
      background: url(../assets/img/微信-支付@3x.png) no-repeat 10px center;
      background-size: 23px 23px;
    }
    li:nth-of-type(2){
      background: url(../assets/img/快捷支付@3x.png) no-repeat 10px center;
      background-size: 23px 23px;
    }
  }
  .checkstand-zf{
    display: block;
    height: 45px;
    width: 95%;
    margin: 0 10px;
    border: none;
    background-color: #fe5728;
    border-radius: 10px;
    margin-top: 45px;
    font-size: 17px;
    color: white;
  }
}
</style>

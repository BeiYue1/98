<template>
    <div :class="{'indent-fication':isSuccess === 0,
                  'ing':isSuccess === 1,
                  'low':isSuccess === 2
                }">
        <div :class="{
            'indent-img':isSuccess === 0,
            'indent-ing':isSuccess === 1,
            'indent-low':isSuccess === 2
        }"></div>
        
        <button @click="bank">返回</button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data () {
        return {
        }
    },
    methods:{
        bank(){
            alert(1);
            if(this.isSuccess === 0){
                this.$router.push('/indent')
            } else if( this.isSuccess === 2 ){
                this.$router.push('/tenants')
            }else{
                this.$router.push('/');
            }
        }
    },
    created(){
        console.log(this.isSuccess);
    },
    computed:{
        ...mapState(["isSuccess"]),
    },
    components: {

    }
}
</script>

<style lang="less" scoped>
.indent-fication,.ing,.low{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background:url(../assets/img/审核成功@2x.png) no-repeat 0 0 white;
    background-size: 100%;
    text-align: center;
    .indent-img,.indent-ing,.indent-low{
        width: 107px;
        height: 107px;
        background:url(../assets/img/认证成功@2x.png) no-repeat 0 0 transparent;
        background-size: 100%;
        margin: 50px auto 0 auto;
    }
    .indent-ing{
        background: url(../assets/img/认证中2@2x.png) no-repeat 0 0 transparent;
        background-size: 100%;
    }
    .indent-low{
        background: url(../assets/img/认证失败@2x.png) no-repeat 0 0 transparent;
        background-size: 100%;
    }
    button{
        width: 85%;
        height: 50px;
        color: #333333;
        font-size: 17px;
        background-color: white;
        border-radius: 10px;
        margin-top: 137px;
        border: 1px solid #999999;
        }
    }
.ing{
    background:url(../assets/img/审核中@2x.png) no-repeat 0 0 white;
    background-size: 100%;
}
.low{
    background:url(../assets/img/审核失败@2x.png) no-repeat 0 0 white;
    background-size: 100%;
}
</style>

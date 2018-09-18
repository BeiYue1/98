<template>
    <div class="indent">
        <div class="index-cont">
            <img :src="dataNews.headimgurl" alt="">
            <div class="index-news">
                <p>{{ dataNews.nickname }}</p>
                <p></p>

            </div>
            <div class="indent-shh">商户号：{{ dataNews.memberNo }}</div>
        </div>
        <div class="index-nav">
            <div>
                <router-link class="sl" to="/stand">
                    <span>收银台</span><span>便捷收银</span>   
                </router-link>
            </div>
            <div>
                <router-link class="dd" to="/ding">
                    <span>订单管理</span><span>查看流水</span>
                </router-link>
            </div>
            <div>
                <router-link class="sh" to="/tenants">
                    <span>商户认证</span><span>认证信息</span>
                </router-link>
            </div>
            <div>
                <router-link to="/news" class="zh">
                    <span>账户信息</span><span>结算账户</span>
                </router-link>
            </div>
        </div>
        <footer class="index-footer">
            <div>
                <router-link to="/persona">个人资料</router-link>
            </div>
            <div>
                <router-link to="/notice">系统公告</router-link>
            </div>
        </footer>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data () {
            return {

            }
        },
        computed:{
            ...mapState(["dataNews","dataInfo","memberId"]),
        },
        beforeRouteLeave(to, from, next){
            from.meta.keepAlive = true;
            next();
        },
        mounted(){
            
            let menberId = window.localStorage.menberId;
            
            this.$API.getHyNews(menberId).then(res =>{
                let data = res.data.resObj;
                this.$store.commit('setInfo',data);
            })
            this.$API.getMyNews(menberId).then(res =>{
                let data = res.data.resObj;
                this.$store.commit('setData',data);
            })
        },
        components: {

        }
    }
</script>

<style lang='less' scoped>

.index-cont{
    .index-news{
        p:nth-of-type(2){
            height: 18px;
            width: 56px;
            background: url(../assets/img/已认证@3x.png) no-repeat;
            background-size: cover;
            margin-top: 10px;
        }
    }
    .indent-shh{
        display: block;
        font-size: 13px;
        color: white;
        position: absolute;
        top: 123px;
        left: 15px;
    }
}
</style>

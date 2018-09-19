import axios from 'axios'
import qs from 'qs'

const prodURL = 'http://console.98gongyi.com'; //TODO:待定
const baseURL = process.env.NODE_ENV === 'development' ? '/dev' : prodURL;

const $http = axios.create({
        baseURL: 'http://console.98gongyi.com',
        transformRequest: [request => qs.stringify(request)],
       
        transformResponse: [responseData => {
            let formattedData = JSON.parse(responseData);
            console.log(formattedData);
            let backendResultCode = formattedData.code;
            if (+backendResultCode === 200) {
                // 接口正常返回
                return {
                    normal: true,
                    ...formattedData
                }
            } else {
                return formattedData
            }
        }],
        headers: {
            
        },
        timeout: 20000
    }
);

export default {
    _$http: $http,
    _prodURL: prodURL,

    getList: data => $http.post('/api/mchReg/auth',data), //商户认证

    getBank: data => $http.get('/api/mchReg/banks',{}),     //获取银行列表 
                      
    getNews: data => $http.get('/api/message/list',{}),  //获取系统消息

    getBankList: data => $http.get('/api/mchReg/bankNameList',{}), //获取银行

    getIdNews: data => $http.get(`/api/message/detail/${data}`,{}), //根据ID来获取消息的详细信息

    getWxNews: data => $http.get(`/api/index/memberInfo`,{    //商户信息获取
        params:{
            code:data,
        }
    }), 

    getAccount: data => $http.get( `/api/trans/${data.memberId}/${data.status}`,{}), //根据会员id和状态获取流水

    //会员相关接口 
    getHyNews: data => $http.get(`/api/member/account/${data}`,{}),  //我的账户信息(没有数据)

    getMyNews: data => $http.get(`/api/member/myinfo/${data}`,{}),    //个人信息

    getBingTel:data => $http.post(`/api/member/bindphone/${data.memberId}`,data),//手机绑定

    getTelNews:data => $http.post(`/api/member/sendSms?phone=${data}`),  //发送手机验证码

    getMonly:data => $http.post('/api/desk/quick',data),  //用户支付

    getFind:data => $http.post('/api/desk/query',data) ,   //支付结果查询

    getSubBankList:data => $http.get('/api/mchReg/subBankList',{   //银行查询
        params:{
            bankName:data.bankName,
            keywords:data.keywords
        }
    })



}
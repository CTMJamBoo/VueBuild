import axios from 'axios'
import { Indicator } from 'mint-ui'
import {commonUrl,VUE_APP_TYPE} from './env.js'


//请求拦截器，在请求发到接口之前
axios.interceptors.request.use(function(config) {
    //发出请求的时候，显示正在加载中，并且页面不可点击
    Indicator.open('加载中')


    if(VUE_APP_TYPE == 'hybrid'){
        config.url = config.url.replace(/\/native\/api/,commonUrl)
        config.url = config.url.replace(/\/lijiang\/api/,'https://www.muji.com.cn')
    }

    return config
}, function(error) {
    return Promise.reject(error)
});

//响应拦截器，在响应回到页面之前
axios.interceptors.response.use(function(response) {
    //接收请求的时候，去掉正在加载中，页面回归正常
    Indicator.close()

    return response.data
}, function(error) {
    return Promise.reject(error)
})
export default axios
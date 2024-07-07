import axios, {get} from "axios";
import qs from "querystring";
import AuthUtil from "./AuthUtil.js";

const BASE_URL = 'https://www.wanandroid.com/';

/**
 * 打印请求响应时的关键日志信息
 * @param response 接口响应信息
 */

const _axios = axios.create({
    baseURL: BASE_URL,
    timeout: 6000
})

_axios.interceptors.request.use(async config => {
        const Cookie = await AuthUtil.getCookie();
        if (config.method === 'post') {
            let data = new FormData();
            for (const i in config.data) {
                data.append(i, config.data[i]);
            }
            config.data = data;
        }
        if (config.url !== 'user/login' && Cookie) {
            config.headers = {Cookie};
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    })
//
_axios.interceptors.response.use(async response => {
        const {data} = response;
        if (data.errorCode === 0) {
            return Promise.resolve(data);
        }
        return Promise.reject(data.errorMsg || '请求失败');
    },
    function (error) {
        console.log('request err', error)
    })


export default _axios
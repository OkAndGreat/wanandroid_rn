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
        console.log('请求拦截器 - 请求URL:', config.baseURL + config.url);
        console.log('请求拦截器 - 请求方法:', config.method);
        console.log('请求拦截器 - 请求头:', config.headers);
        console.log('请求拦截器 - 请求数据:', config.data);
        
        const Cookie = await AuthUtil.getCookie();
        if (config.method === 'post') {
            // 使用qs库序列化数据
            config.data = qs.stringify(config.data);
            console.log('请求拦截器 - 序列化后的数据:', config.data);
            
            // 设置Content-Type为application/x-www-form-urlencoded
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...config.headers
            };
        }
        
        if (config.url !== 'user/login' && Cookie) {
            config.headers = {
                ...config.headers,
                Cookie
            };
        }
        
        console.log('请求拦截器 - 最终请求配置:', config);
        return config;
    },
    function (error) {
        console.log('请求拦截器 - 请求错误:', error);
        return Promise.reject(error);
    })
//
_axios.interceptors.response.use(async response => {
        console.log('响应拦截器 - 响应URL:', response.config.url);
        console.log('响应拦截器 - 响应状态码:', response.status);
        console.log('响应拦截器 - 响应头:', response.headers);
        console.log('响应拦截器 - 响应数据:', response.data);
        
        const {data} = response;
        
        // 处理登录接口的Cookie
        if (response.config.url === 'user/login' && response.headers && response.headers['set-cookie']) {
            console.log('响应拦截器 - 保存Cookie:', response.headers['set-cookie']);
            await AuthUtil.saveCookie(response.headers['set-cookie'].join(';'));
        }
        
        if (data.errorCode === 0) {
            console.log('响应拦截器 - 请求成功');
            return Promise.resolve(data);
        }
        
        console.log('响应拦截器 - 请求失败，错误码:', data.errorCode, '错误信息:', data.errorMsg);
        
        // 返回错误对象而不是字符串
        return Promise.reject({
            errorCode: data.errorCode || -1,
            errorMsg: data.errorMsg || '请求失败'
        });
    },
    function (error) {
        console.log('响应拦截器 - 网络错误:', error);
        console.log('响应拦截器 - 错误响应:', error.response);
        
        // 确保网络错误也返回对象格式
        return Promise.reject({
            errorCode: -1,
            errorMsg: error.message || '网络错误'
        });
    })


export default _axios
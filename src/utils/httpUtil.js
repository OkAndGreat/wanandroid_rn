import qs from 'querystring';
import _axios from "./setAxios";

export default class httpUtil {
    static get(url, params) {
        console.log('httpUtil.get - 请求URL:', url);
        console.log('httpUtil.get - 请求参数:', params);
        
        return new Promise(async (resolve, reject) => {
            try {
                let query = qs.stringify(params);
                let res = null;
                if (!params) {
                    console.log('httpUtil.get - 发送无参数GET请求');
                    res = await _axios.get(url);
                } else {
                    console.log('httpUtil.get - 发送带参数GET请求:', url + '?' + query);
                    res = await _axios.get(url + '?' + query);
                }
                console.log('httpUtil.get - 请求成功，响应:', res);
                resolve(res);
            } catch (error) {
                const errorMsg = `请求报错路径: ${url} \n 请求报错信息: ${error}`;
                console.log('httpUtil.get - 请求失败:', errorMsg);
                reject(error);
            }
        });
    }

    static post(url, params) {
        console.log('httpUtil.post - 请求URL:', url);
        console.log('httpUtil.post - 请求参数:', params);
        
        return new Promise(async (resolve, reject) => {
            try {
                console.log('httpUtil.post - 发送POST请求');
                let res = await _axios.post(url, params);
                console.log('httpUtil.post - 请求成功，响应:', res);
                resolve(res);
            } catch (error) {
                const errorMsg = `请求报错路径: ${url} \n请求报错信息: ${error}`;
                console.log('httpUtil.post - 请求失败:', errorMsg);
                reject(error);
            }
        });
    }
}
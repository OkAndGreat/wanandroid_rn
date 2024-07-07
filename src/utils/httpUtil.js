import qs from 'querystring';
import _axios from "./setAxios";

export default class httpUtil {
    static get(url, params) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = qs.stringify(params);
                let res = null;
                if (!params) {
                    res = await _axios.get(url);
                } else {
                    res = await _axios.get(url + '?' + query);
                }
                resolve(res);
            } catch (error) {
                const errorMsg = `请求报错路径: ${url} \n 请求报错信息: ${error}`;
                console.log(errorMsg);
                reject(error);
            }
        });
    }

    static post(url, params) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await _axios.post(url, params);
                resolve(res);
            } catch (error) {
                const errorMsg = `请求报错路径: ${url} \n请求报错信息: ${error}`;
                console.log(errorMsg);
                reject(error);
            }
        });
    }
}
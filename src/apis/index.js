import httpUtil from '../utils/httpUtil';

// 首页文章列表
export function getHomeList(page = 0) {
    return httpUtil.get(`article/list/${page}/json`);
}

// 首页轮播
export async function getHomeBanner() {
    return await httpUtil.get('banner/json');
}

// 用户登录
export function login(username, password) {
    return httpUtil.post('user/login', { username, password });
}

// 用户注册
export function register(username, password, repassword) {
    return httpUtil.post('user/register', { username, password, repassword });
}

// 获取用户信息
export function getUserInfo() {
    return httpUtil.get('user/lg/userinfo/json');
}

// 获取用户积分信息
export function getUserCoinInfo() {
    return httpUtil.get('lg/coin/userinfo/json');
}

// 退出登录
export function logout() {
    return httpUtil.get('user/logout/json');
}

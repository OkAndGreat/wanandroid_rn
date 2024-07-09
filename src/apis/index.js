import httpUtil from '../utils/httpUtil';

// 首页文章列表
export function getHomeList(page = 0) {
    return httpUtil.get(`article/list/${page}/json`);
}

// 首页轮播
export async function getHomeBanner() {
    return await httpUtil.get('banner/json');
}

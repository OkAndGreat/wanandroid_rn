import httpUtil from '../utils/httpUtil';

// 首页文章列表
export function getHomeList(page = 0) {
    return httpUtil.get(`article/list/${page}/json`);
}
// 获取首页文章列表
import httpUtil from "../../../utils/httpUtil";

export const fetchHomeData = (page: number) => {
  return httpUtil.get(`/article/list/${page}/json`);
};

// 获取首页Banner数据
export const fetchHomeBannerData = () => {
  return httpUtil.get('/banner/json');
};
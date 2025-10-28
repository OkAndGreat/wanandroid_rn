/**
 * 登录响应模型
 */
export class LoginResponse {
  constructor(data) {
    this.data = data?.data || null;
    this.errorCode = data?.errorCode || 0;
    this.errorMsg = data?.errorMsg || '';
  }
}

/**
 * 用户信息模型
 */
export class UserInfo {
  constructor(data) {
    this.id = data?.id || 0;
    this.username = data?.username || '';
    this.password = data?.password || ''; // 添加密码字段
    this.nickname = data?.nickname || '';
    this.email = data?.email || '';
    this.icon = data?.icon || '';
    this.type = data?.type || 0;
    this.collectIds = data?.collectIds || [];
    this.admin = data?.admin || false;
    this.chapterTops = data?.chapterTops || [];
    this.token = data?.token || '';
  }
}
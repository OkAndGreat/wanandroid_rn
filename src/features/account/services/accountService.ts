// 登录
import httpUtil from "../../../utils/httpUtil";

export const login = (username: string, password: string) => {
  return httpUtil.post('/user/login', {
    username,
    password
  });
};

// 注册
export const register = (username: string, password: string, repassword: string) => {
  return httpUtil.post('/user/register', {
    username,
    password,
    repassword
  });
};
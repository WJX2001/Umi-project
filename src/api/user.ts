import { request } from 'umi';
export const userLogin = (user: any) => {
  // 登录
  return request('/login', {
    method: 'POST',
    data: user,
  });
};

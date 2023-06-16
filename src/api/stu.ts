import { request } from 'umi';

export const stuGet = () => {
  // 新增
  return request('/classes/stu', {
    method: 'GET',
  });
};

export const stuDelete = (id: string) => {
  // 删除
  return request(`/classes/stu?id=${id}`, {
    method: 'DELETE',
  });
};

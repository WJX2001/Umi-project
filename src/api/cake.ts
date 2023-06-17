import { Request, request } from 'umi';

// 新增分类
export const cateAdd = (cateObj: any) => {
  return request('/classes/CakeCate', {
    method: 'POST',
    data: cateObj,
  });
};

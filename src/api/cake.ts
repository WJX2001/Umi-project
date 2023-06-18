import { Request, request } from 'umi';

// 新增分类
export const cateAdd = (cateObj: any) => {
  return request('/classes/CakeCate', {
    method: 'POST',
    data: cateObj,
  });
};

// 新增轮播
export const bannerAdd = (bannerObj: any) => {
  return request('/classes/CakeBanner', {
    method: 'POST',
    data: bannerObj,
  });
};

// 加载轮播
export const bannerGet = () => {
  return request('/classes/CakeBanner', {
    method: 'GET',
  });
};

// 删除轮播列表图
export const bannerDelete = (id: string) => {
  // 删除
  return request(`/classes/CakeBanner?id=${id}`, {
    method: 'DELETE',
  });
};

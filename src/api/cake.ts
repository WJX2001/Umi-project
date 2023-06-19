import { Request, request } from 'umi';

// 新增分类
export const cateAdd = (cateObj: any) => {
  return request('/classes/CakeCate', {
    method: 'POST',
    data: cateObj,
  });
};

// 分类列表
export const cateGet = () => {
  return request('/classes/CakeCate', {
    method: 'GET',
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

// 更新轮播图
export const bannerUpdate = (objectId: string, bannerObj: any) => {
  // 更新轮播
  return request(`/classes/CakeBanner/${objectId}`, {
    method: 'PUT',
    data: bannerObj,
  });
};

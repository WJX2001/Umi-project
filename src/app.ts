// 在这个文件中做项目的运行时配置

import { message } from 'antd';
import './utils/init-leancloud-sdk'; //初始化leanCloud的sdk
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

import { history } from 'umi';

// 异步请求相关运行时配置
export const request = {
  // 请求拦截
  requestInterceptors: [
    (url, options) => {
      console.log('请求拦截器', url, options);
      // 如果想要测试本地数据，请注释以下代码(如果想测试线上环境，请带上下面的内容)
      options.url = 'https://sn7hajub.lc-cn-n1-shared.com/1.1' + url;
      options.headers = {
        'X-LC-Id': 'Sn7HaJubkpny1rWPfq2Z1Oa5-gzGzoHsz', //务必改为自己的Id
        'X-LC-Key': 'QXKS65JgjITfDHUfPlJpC4eJ', //务必改为自己的Key
        'Content-Type': 'application/json',
      };
      return options; // 此处return 的内容就是自定义请求配置
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    async (response: any, options: any) => {
      let res = await response.json();

      if (res.objectId) {
        let method = options.method.toLowerCase();
        let msg = method == 'post' ? '新增成功' : '更新成功,请刷新页面';
        message.success(msg);
      }
      console.log('响应拦截器', res, options);
      let { results } = res;
      let data = results ? results : res;
      return { data }; // 此处return 的内容是后端下发的数据包
    },
  ],
};

// 初始化全局数据的运行时配置
export async function getInitialState() {
  let userState = {
    isLogin: false,
    userInfo: null,
  };
  console.log('getInitialState运行时配置', userState);
  return userState;
}

// layout的运行时配置，自定义控制Layout的渲染逻辑
export const layout = ({ initialState }: any) => {
  return {
    onPageChange: () => {
      // 此处可以根据用户的登录状态引导用户进行指定的访问
      console.log('onPageChange', initialState);
      let { isLogin } = initialState;
      if (!isLogin) {
        // 此时没有登录
        history.push('/login');
      }
    },
  };
};

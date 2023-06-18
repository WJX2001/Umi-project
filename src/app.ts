// 在这个文件中做项目的运行时配置

import { message } from 'antd';

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

      if (res.objectId && options.method.toLowerCase() == 'post') {
        // console.log('新增成功')
        message.success('新增成功');
      }
      console.log('响应拦截器', res, options);
      return { data: res.results }; // 此处return 的内容是后端下发的数据包
    },
  ],
};

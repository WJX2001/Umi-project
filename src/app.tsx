// 在这个文件中做项目的运行时配置

// 异步请求相关运行时配置
export const request = {
  // 请求拦截
  requestInterceptors: [
    (url: string, options: string) => {
      console.log('请求拦截器', url, options);
      return options; // 此处return 的内容就是自定义请求配置
    },
  ],

  // 响应拦截
  responseInterceptors: [
    (response: string, options: string) => {
      console.log('响应拦截器', response, options);
      return response; // 此处return 的内容是后端下发的数据包
    },
  ],
};

// 初始化leancloud的文件上传SDK

// 引入
const Cloud = require('leancloud-storage');
const { Query, User } = Cloud;

// 初始化
Cloud.init({
  appId: 'Sn7HaJubkpny1rWPfq2Z1Oa5-gzGzoHsz', // 真实项目中不要上传仓库提交
  appKey: 'DCgfzVDOTwVbN47YLONDcqBl',
  serverURL: 'https://sn7hajub.lc-cn-n1-shared.com', // 自己配置的域名
});

export default [
  // 配置式路由
  {
    path: '/',
    component: '@/pages/index',
    name: '项目首页',
  },
  {
    path: '/test',
    component: '@/pages/test/index',
    name: '测试页面',
  },
  {
    path: '/stu',
    name: '学员管理',
    routes: [
      {
        path: '/stu/list',
        component: '@/pages/stu/list',
        name: '学员列表',
      },
      {
        path: '/stu/pub',
        component: '@/pages/stu/pub',
        name: '学员录入',
      },
    ],
  },
  {
    path: '/cate/',
    name: '分类管理',
    routes: [
      {
        path: 'cate/list',
        component: '@/pages/category/catelist',
        name: '分类列表',
      },
      {
        path: 'cate/pub',
        component: '@/pages/category/catepub',
        name: '分类录入',
      },
    ],
  },
];

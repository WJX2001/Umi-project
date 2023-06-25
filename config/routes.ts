export default [
  // 配置式路由
  {
    path: '/login',
    component: '@/pages/login/index',
    name: '登录面板',
    layout: false,
    hideInMenu: true,
  },
  {
    path: '/',
    component: '@/pages/index',
    name: '项目首页',
    icon: 'AreaChartOutlined',
  },
  {
    path: '/test',
    component: '@/pages/test/index',
    name: '测试页面',
    icon: 'GitlabOutlined',
  },
  {
    path: '/stu',
    name: '学员管理',
    icon: 'AliwangwangOutlined',
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
    icon: 'WindowsOutlined',
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
  {
    path: '/banner',
    name: '轮播管理',
    icon: 'RadarChartOutlined',
    routes: [
      {
        path: 'banner/list',
        component: '@/pages/banner/list',
        name: '轮播列表',
      },
      {
        path: 'banner/pub',
        component: '@/pages/banner/pub',
        name: '轮播录入',
      },
    ],
  },
  {
    path: '/goods',
    name: '商品管理',
    icon: 'CodeSandboxOutlined',
    routes: [
      {
        path: 'goods/list',
        component: '@/pages/goods/list',
        name: '商品列表',
      },
      {
        path: 'goods/pub',
        component: '@/pages/goods/pub',
        name: '商品发布',
      },
    ],
  },
  {
    path: '/dva',
    name: '状态管理',
    icon: 'AreaChartOutlined',
    routes: [
      {
        path: '/dva/a',
        component: '@/pages/testdva/ComA',
        name: 'A组件',
      },
      {
        path: '/dva/b',
        component: '@/pages/testdva/ComB',
        name: 'B组件',
      },
    ],
  },
];

import { defineConfig } from 'umi';
import routes from '../config/routes';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {
    dark: false,
  },
  layout: {
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    name: 'Ant Design',
    locale: true,
    layout: 'side',
  },
  dva: {
    // 启用dva进行状态管理
    immer: false,
  },
  routes,
  fastRefresh: {},
});

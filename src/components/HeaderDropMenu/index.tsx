import React from 'react';
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { useModel, history } from 'umi';

const HeaderDropMenu = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    message.info('Click on menu item.');
    if (key === '2') {
      // 退出
      console.log('你要退出吗');
      // 清除 initialState
      setInitialState({ isLogin: false, userInfo: null });
      // 清除 本地存储
      localStorage.removeItem('userInfo');
      sessionStorage.removeItem('userInfo');
      // 路由跳转
      history.push('/login');
    }
  };

  const items: MenuProps['items'] = [
    {
      label: '个人设置',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '退出登录',
      key: '2',
      icon: <LogoutOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div>
      <Space wrap>
        <Dropdown.Button menu={menuProps}>Dropdown</Dropdown.Button>
      </Space>
    </div>
  );
};

export default HeaderDropMenu;

import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Card, Row, Col, Spin } from 'antd';
import { useModel, history, useRequest } from 'umi';
import { userLogin } from '@/api/user';

const Login = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [rememberCheck, setRememberCheck] = useState(false);
  const initData = {
    username: 'wxx',
    password: '123',
    remember: rememberCheck,
  };
  let { data, loading, run } = useRequest(userLogin, {
    manual: true,
  });
  const onFinish = (values: any) => {
    console.log('Success:', values);
    run(values);
    setRememberCheck(values.remember);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (data) {
      if (rememberCheck) {
        localStorage.setItem('userInfo', JSON.stringify(data));
      } else {
        sessionStorage.setItem('userInfo', JSON.stringify(data));
      }

      //修改全局的initialState ，让Layout有机会进入主面板
      setInitialState({
        isLogin: true,
        userInfo: data,
      });
      // 触发路由切换至 '/' 根组件
      setTimeout(() => {
        history.push('/');
      }, 200);
    }
  }, [data]);

  return (
    <>
      <Row
        align="middle"
        style={{ height: '100vh', backgroundColor: '#f6f6f6' }}
      >
        <Col span={8} offset={8}>
          <Spin spinning={loading}>
            <Card title="请登录">
              <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                // style={{ maxWidth: 600 }}
                initialValues={{ initData }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="账号"
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="密码"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Spin>
        </Col>
      </Row>
    </>
  );
};
export default Login;

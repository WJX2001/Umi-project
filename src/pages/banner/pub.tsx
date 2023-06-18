import { Button, Form, Input, Spin } from 'antd';
import React from 'react';
import { bannerAdd } from '@/api/cake';
import { useRequest } from 'umi';
import ImgUpload from '@/components/imgUpload';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const BannerPub: React.FC = () => {
  const [form] = Form.useForm();

  let { data, loading, run } = useRequest(
    (value) => {
      console.log('useRequest执行了', value);
      return bannerAdd(value);
    },
    { manual: true }, // 开启手动执行
  );

  const onFinish = (values: any) => {
    // 手动执行useRequest
    run(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  // 测试数据
  const initData = {
    title: '五一节活动',
    link: 'https://h5.mcake.com/?key1=hd_banner&key2=xinren2022#/active?id=2236&type=2',
  };

  return (
    <Spin spinning={loading}>
      <Form
        initialValues={initData}
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="title" label="活动名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="link" label="活动链接" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="imgurl" label="封面图片" rules={[{ required: true }]}>
          <ImgUpload />
        </Form.Item>
        <Form.Item {...tailLayout}>
          {/* 这里的htmlType指的是表单中onFinish事件 */}
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default BannerPub;

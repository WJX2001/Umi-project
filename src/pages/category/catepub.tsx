import { Button, Form, Input, Select } from 'antd';
import React from 'react';
import { cateAdd } from '@/api/cake';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CatePub: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
    cateAdd(values).then((res) => {
      console.log(res);
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="catename" label="分类名称" rules={[{ required: true }]}>
        <Input />
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
  );
};

export default CatePub;

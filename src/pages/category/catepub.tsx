import { Button, Form, Input, Spin } from 'antd';
import React from 'react';
import { cateAdd } from '@/api/cake';
import { useRequest } from 'umi';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CatePub: React.FC = () => {
  const [form] = Form.useForm();

  let { data, loading, run } = useRequest(
    (value) => {
      console.log('useRequest执行了', value);
      return cateAdd(value);
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

  return (
    <Spin spinning={loading}>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="catename"
          label="分类名称"
          rules={[{ required: true }]}
        >
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
    </Spin>
  );
};

export default CatePub;

import { Button, Form, Input, Spin, Select } from 'antd';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import RichEditor from '@/components/RichEditor';
import React from 'react';
import { cateGet } from '@/api/cake';
import { useRequest } from 'umi';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const GoodsPub: React.FC = () => {
  const [form] = Form.useForm();
  let { data, loading } = useRequest(cateGet);
  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  // selector 中选项
  const options = data?.map((item: { objectId: any; catename: any }) => ({
    value: item.objectId,
    label: item.catename,
  }));

  return (
    <Spin spinning={loading}>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="cateid" label="分类选择" rules={[{ required: true }]}>
          <Select placeholder="请选择商品分类" options={options} />
        </Form.Item>
        <Form.Item name="detail" label="商品详情" rules={[{ required: true }]}>
          <div>
            <RichEditor />
          </div>
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

export default GoodsPub;

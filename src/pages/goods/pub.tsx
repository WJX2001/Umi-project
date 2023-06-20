import { Button, Form, Input, Spin, Select } from 'antd';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import RichEditor from '@/components/RichEditor';
import React from 'react';
import { cateGet, goodsAdd, goodsExchange } from '@/api/cake';
import { useRequest, request } from 'umi';
import axios from 'axios';
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

    //? 1. 拿到目标平台的数据包
    // let url = 'https://h5.mcake.com/cake/api/5e90690f0e270d04?cityId=641'
    // let url2 = 'http://localhost:3000/cake/api/0434b49d1ac28f9d?cityId=641&page=1&bid=1'
    // let url1 = 'http://localhost:3000/users'
    let url3 =
      'http://localhost:3000/cake/api/0434b49d1ac28f9d?cityId=110&page=1&bid=11';
    axios({
      url: url3,
      method: 'get',
      headers: {
        'access-token': '10e8d0263ae6bfd7ff7d51c59b5390b2',
        version: 'v1.0',
      },
    }).then((res) => {
      console.log(res);
      goodsExchange(res.data.data.list);
    });
    //? 2. 把拿到的数据包格式进行处理

    //? 3. 把处理后的数据包转存至leanCloud

    // goodsAdd(values).then(res => {
    //   console.log(res)
    // })
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const a = form.getFieldsValue();

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
          <RichEditor />
        </Form.Item>
        <Form.Item {...tailLayout}>
          {/* 这里的htmlType指的是表单中onFinish事件 */}
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
          <Button type="dashed" htmlType="submit">
            批量转存
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default GoodsPub;

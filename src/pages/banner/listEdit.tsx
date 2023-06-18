import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Spin, Modal } from 'antd';
import ImgUpload from '@/components/imgUpload';
import { bannerAdd } from '@/api/cake';
import { useRequest } from 'umi';

interface IProps {
  open: boolean;
  handleCancel: () => void;
  handleOk: () => void;
  record: any; // 新增 record 属性
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ListEdit = ({ open, record, handleCancel, handleOk }: IProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(record, 'record');
    form.setFieldsValue(record);
  }, [record]);

  let {
    data,
    loading: loadingSubmit,
    run,
  } = useRequest(
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

  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={loadingSubmit}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
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

          <Form.Item
            name="imgurl"
            label="封面图片"
            rules={[{ required: true }]}
          >
            <ImgUpload />
          </Form.Item>
          <Form.Item {...tailLayout}>
            {/* 这里的htmlType指的是表单中onFinish事件 */}
            <Button type="primary" htmlType="submit" onClick={handleOk}>
              确定修改
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListEdit;

import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Spin, Modal } from 'antd';
import ImgUpload from '@/components/imgUpload';
import { bannerUpdate } from '@/api/cake';
import { useRequest } from 'umi';

interface IProps {
  open: boolean;
  handleCancel: () => void;
  handleOk: () => void;
  handelSetData: (value: any) => void;
  record: any; // 新增 record 属性
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ListEdit = ({
  open,
  record,
  handleCancel,
  handleOk,
  handelSetData,
}: IProps) => {
  const [form] = Form.useForm();

  const {
    data,
    loading: loadingSubmit,
    run,
  } = useRequest(
    (value) => {
      console.log('useRequest执行了', value);
      console.log('data被执行啦', data);
      return bannerUpdate(record.objectId, value);
    },
    { manual: true }, // 开启手动执行
  );

  const onFinish = (values: any) => {
    // 手动执行useRequest
    console.log(values, '狄仁杰');
    run(values);
  };
  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    console.log(record, 'edit页面的传入值');
    form.setFieldsValue(record);
  }, [record]);

  useEffect(() => {
    // 更新成功后将数值传回
    if (data) {
      console.log('data更新成功', data);
    }
  }, [data]);

  const formData = form.getFieldsValue();
  useEffect(() => {
    console.log('表单值你在这啊', formData);
    if (formData) {
      // handelSetData(formData)
    }
  }, [formData]);

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
              更新
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

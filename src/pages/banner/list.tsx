import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Image, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { bannerGet, bannerDelete } from '../../api/cake';
import { useRequest } from 'umi';
import ListEdit from './listEdit';

interface DataType {
  key: string;
  name: string;
  score: number;
  city: string;
  tags: string[];
  birthday: string;
  objectId: string;
}

const BannerList = () => {
  // let [loading, setLoading] = useState(true);
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'objectId',
      key: 'objectId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '活动名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '活动链接',
      dataIndex: 'link',
      key: 'link',
      render: (url) => (
        <a href={url} target="_blank">
          点击预览
        </a>
      ),
    },
    {
      title: '活动封面',
      key: 'imgurl',
      dataIndex: 'imgurl',
      render: (url) => <Image src={url} height={50} />,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setrecordForm(record);
              setOpen(true);
            }}
          >
            编辑
          </Button>

          <Button
            danger
            size="small"
            onClick={() => {
              Modal.confirm({
                title: '提示',
                content: '你确定要删除吗？',
                onOk: () => {
                  bannerDelete(record.objectId).then((res) => {
                    console.log(res);
                    data.splice(index, 1);
                    setData([...data]);
                  });
                },
              });
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];
  let [data, setData] = useState([]);

  useEffect(() => {
    bannerGet().then((res) => {
      setData(res.data);
    });
  }, []);

  //? 方法三： 对方法二的优化 简化userequest 的使用 需要在app.ts 拦截器中提前统一处理
  const { loading, error } = useRequest(bannerGet);

  // 弹窗相关的状态管理
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [recordForm, setrecordForm] = useState({});

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  // TODO: 这里可以用useRequest优化 loading操作
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handelSetRecord = (value: any) => {
    setrecordForm(value);
  };

  const handelSetData = (values: any) => {
    setData(values);
  };

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey="objectId"
      />
      <ListEdit
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handelSetData={handelSetData}
        record={recordForm}
      />
    </div>
  );
};

export default BannerList;

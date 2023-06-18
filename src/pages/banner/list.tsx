import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { bannerGet, bannerDelete } from '../../api/cake';
import { useRequest } from 'umi';

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
  let [data, setData] = useState([]);
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
          <Button type="primary" size="small">
            编辑
          </Button>

          <Button
            danger
            size="small"
            onClick={() => {
              bannerDelete(record.objectId).then((res) => {
                console.log(res);
                data.splice(index, 1);
                setData([...data]);
              });
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    console.log(1111);
    bannerGet().then((res) => {
      console.log('wjx', res);
      setData(res.data);
    });
  }, []);

  //? 方法三： 对方法二的优化 简化userequest 的使用 需要在app.ts 拦截器中提前统一处理
  const { loading, error } = useRequest(bannerGet);

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey="objectId"
      />
    </div>
  );
};

export default BannerList;

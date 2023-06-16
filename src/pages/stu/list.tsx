import React, { useState, useEffect } from 'react';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { stuGet } from '../../api/stu';


interface DataType {
  key: string;
  name: string;
  score: number;
  city: string;
  tags: string[];
  birthday: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: '生日',
    key: 'birthday',
    dataIndex: 'birthday',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type='primary' size='small'>编辑</Button>
        <Button type='danger' size='small'>删除</Button>
      </Space>
    ),
  },
];

const StuList = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    stuGet().then((res) => {
      console.log(res);
      const formattedData = res.data.map((item: DataType, index: number) => ({
        ...item,
        key: index.toString(),
      }));
      setData(formattedData);
    });
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default StuList;

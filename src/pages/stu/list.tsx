

import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

// 测试数据 非响应式
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    score: 32,
    city: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
    birthday: '2023.12.12'
  },

];

const App = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data}></Table>
    </div>
  )
}

export default App;
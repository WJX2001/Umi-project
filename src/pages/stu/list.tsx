import React, { useState, useEffect } from 'react';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { stuGet, stuDelete } from '../../api/stu';

interface DataType {
  key: string;
  name: string;
  score: number;
  city: string;
  tags: string[];
  birthday: string;
  objectId: string;
}

const StuList = () => {
  let [data, setData] = useState([]);
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
      render: (text, record, index) => (
        <Space size="middle">
          <Button type="primary" size="small">
            编辑
          </Button>

          <Button
            danger
            size="small"
            onClick={() => {
              stuDelete(record.objectId).then((res) => {
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
    stuGet().then((res) => {
      console.log(res);
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="objectId" />
    </div>
  );
};

export default StuList;

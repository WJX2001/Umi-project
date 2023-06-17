import React, { useState, useEffect } from 'react';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { stuGet, stuDelete } from '../../api/stu';
import { useRequest } from 'umi';
import stu from 'mock/stu';
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
  // let [data, setData] = useState([]);
  // let [loading, setLoading] = useState(true);
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
            // onClick={() => {
            //   stuDelete(record.objectId).then((res) => {
            //     console.log(res);
            //     data.splice(index, 1);
            //     setData([...data]);
            //   });
            // }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // useEffect(() => {
  //?  方法一： 需要开发者自行处理Loading等请求交互效果
  //   //TODO:  开启 loading效果
  //   // 初始设置为true 所以自动开启
  //   stuGet().then((res) => {
  //     console.log(res);
  //     setData(res.results);
  //     // TODO: 关闭loading效果
  //     setLoading(false);
  //   });
  // }, []);

  //? 方法二：采用useRequest 简化异步请求交互操作
  // const { data, loading, error } = useRequest(async() => {
  //   let res = await stuGet()  // {results:[]}
  //   // 由于leanCloud 返回的结果使用results包裹的，所以我们需要自己处理一下
  //   return  {data: res.results}
  // })

  /**
  //!  data 是后端响应的数据包 默认情况下要求格式必须是：{data:[]}
   * loading 异步请求状态
   * error 异步请求失败的返回结果
   */

  //? 方法三： 对方法二的优化 简化userequest 的使用 需要在app.ts 拦截器中提前统一处理
  const { data, loading, error } = useRequest(stuGet);

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

export default StuList;

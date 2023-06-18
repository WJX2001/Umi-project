import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import '../utils/init-leancloud-sdk'; // 初始化leanCloud的SDK包

import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

// 将本地资源对象 转化为base64编码
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const ImgUpload = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    console.log(props.value, '没找到吧');
  });
  // console.log('ImgUpload组件的props',props)
  // 检测 action接口的上传进度
  // const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj as RcFile, (url) => {
  //       setLoading(false);
  //       setImageUrl(url);
  //     });
  //   }
  // };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const AV = require('leancloud-storage/live-query');

  // 自定义上传函数
  const customUpload = (info: any) => {
    // console.log(info); // info.file 可以提取本地图片资源对象
    setLoading(true);
    // 图片base64编码
    getBase64(info.file as RcFile, (base64) => {
      // 将本地资源对象 转化为base64编码
      // 将本地资源转化成一个可以向leanCloud平台提交的资源
      const file = new AV.File('cakeimg.png', { base64 });
      file.save().then((res: any) => {
        // 上传图片资源
        // console.log(res)
        // 提取url
        let url = res.attributes.url;
        props.onChange(url); // 将图片链接传给组件外父级
        setImageUrl(url);
      });
      setLoading(false);
    });
  };

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={customUpload}
        beforeUpload={beforeUpload}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : props.value ? (
          <img src={props.value} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default ImgUpload;

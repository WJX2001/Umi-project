import React, { useEffect, useRef } from 'react';
import E from 'wangeditor';
import Cloud from 'leancloud-storage';
function getBase64(img: any, callback: any) {
  //将本地资源对象，转换为base64编码
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default function RichEditor(props: any) {
  let editorRef = useRef();
  console.log(props, '富文本编辑器');
  useEffect(() => {
    let editor = new E(editorRef.current); //初始化富文本编辑器实例
    editor.config.menus = [
      //自定义配置菜单
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'indent',
      'lineHeight',
      'foreColor',
      'backColor',
      'link',
      'list',
      'todo',
      'justify',
      'quote',
      'emoticon',
      'image',
    ];
    editor.config.zIndex = 10; //调整层级
    editor.config.onblur = function (newHtml: string) {
      // console.log('onBlur',newHtml)
      props.onChange(newHtml);
    };
    // 自定义图片上传
    editor.config.customUploadImg = function (resultFiles: any, insertImgFn) {
      //自定义图片上传
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      console.log(resultFiles);
      getBase64(resultFiles[0], (base64) => {
        //将本地资源对象，转换为base64编码
        // console.log(base64);
        // insertImgFn(base64)
        // const data = { base64: 'TGVhbkNsb3Vk' };
        // resume.txt 是文件名
        const file = new Cloud.File('cakeimg.png', { base64 }); //将本地资源转化为一个可以向leancloud平台提交的资源
        file.save().then((res) => {
          //上传图片资源
          // console.log(res);
          let { url } = res.attributes;
          insertImgFn(url);
        });
      });
      // 上传图片，返回结果，将图片插入到编辑器中
      // insertImgFn(imgUrl)
    };

    editor.create(); //向指定DOM中渲染编辑器
  }, []);
  return <div ref={editorRef}>渲染富文本编辑器</div>;
}


import React from 'react';
import { Button } from 'antd';
import { Link,history } from 'umi';
export default function Test() {


  const handleRoute = () => {
    history.push('/')
  }

  return (
    <div>
      <Link to='/'>Test</Link>
      <Button type="primary" onClick={handleRoute}>Primary Button</Button>
      
    </div>
  );
}


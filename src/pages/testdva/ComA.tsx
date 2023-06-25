import { Button } from 'antd';
import { connect, useDispatch } from 'umi';
function CompA(props) {
  const dispatch = useDispatch();
  console.log('CompA', props);
  return (
    <div>
      CompA,{props.count}
      <Button
        onClick={() =>
          dispatch({
            type: 'count/increment',
            payload: 10,
          })
        }
      >
        +
      </Button>
      <Button
        type="primary"
        onClick={() => {
          dispatch({
            type: 'count/incrementAsync',
          });
        }}
      >
        延迟两秒后++
      </Button>
    </div>
  );
}

// 详细写法
// export default connect((state) => {
//   console.log('CompA获取的状态机数据',state)
//   return {count:state.count}
// }) (CompA)

// 简写方法
export default connect(({ count }) => ({ count }))(CompA);

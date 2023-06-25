import { Button } from 'antd';
import { connect, useDispatch } from 'umi';
function CompB(props) {
  const dispatch = useDispatch();
  console.log('CompB', props);
  return (
    <div>
      CompB,{props.count}
      <Button
        type="primary"
        onClick={() =>
          dispatch({
            type: 'count/decrement',
          })
        }
      >
        -
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
export default connect(({ count }) => ({ count }))(CompB);

export default {
  state: 100, // 跨组件共享数据包
  reducers: {
    // 相当于vue中的 mutations 同步数据
    increment(state, action) {
      let n = action.payload ? action.payload : 1;
      return state + n;
    },
    decrement(state) {
      return state - 1;
    },
  },
  effects: {
    *incrementAsync(action, { call, put }) {
      let delay = (ms) => {
        //模拟异步请求
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(action);
            resolve();
          }, ms);
        });
      };
      yield call(delay, 2000); //调用异步方法
      yield put({
        type: 'increment',
      }); //触发reducers
    },
  },
};

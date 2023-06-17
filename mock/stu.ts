// 提供学员相关逻辑的mock接口
import mockjs from 'mockjs';

let dataList = mockjs.mock({
  code: 200,
  msg: '学员列表加载成功',
  'results|100': [
    {
      'objectId|+1': 1,
      name: '@cname',
      score: '@integer(50,100)',
      city: '@city',
      birthday: '@date',
    },
  ],
});

export default {
  'GET /classes/test': {
    username: '王吉祥',
    score: 100,
  },
  'GET /classes/stu': dataList,

  'DELETE /classes/stu': (req, res) => {
    const { id } = req.query;
    for (let i = 0; i < dataList.results.length; i++) {
      if (dataList.results[i].objectId == id) {
        // console.log(dataList.data[i].objectId)
        dataList.results.splice(i, 1);
        res.send({
          code: 200,
          msg: '删除成功',
        });
        return;
      }
    }
    res.send({
      code: 100,
      msg: '没有找到对应的数据',
    });
  },
};

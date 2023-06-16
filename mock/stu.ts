// 提供学员相关逻辑的mock接口
import mockjs from 'mockjs'

export default {
  'GET /classes/test': {
    username:'王吉祥',
    score: 100
  },

  'GET /classes/stu':mockjs.mock({
    code:200,
    msg:'学员列表加载成功',
    'data|100': [
      {
        name: '@cname',
        score:'@integer(50,100)',
        city:'@city',
        time:'@date'
      }
    ]
  })
}

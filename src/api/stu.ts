import {request} from 'umi'


export const stuGet = () => {
  return request('/classes/stu',{
    method:'GET',
  })
}
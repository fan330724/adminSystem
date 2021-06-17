
import request from '@/router/axios'

/**
 * 获取表格数据
 */
export function getObj(obj) {
  return request({
    url: '/paybiz/financial/financialCheck',
    method: 'post',
    data: obj
  })
}

/**
 * 获取对账数据
 */
export function getCount(obj) {
  return request({
    url: '/paybiz/financial/financialCount',
    method: 'post',
    data: obj
  })
}

/**
 * 点击处理
 */
export function editObj(obj) {
  return request({
    url: '/paybiz/financial',
    method: 'put',
    data: obj
  })
}




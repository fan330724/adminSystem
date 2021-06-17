import request from '@/axios/index'

/**
 * 车场车位/今日车辆总数/今日收入
 * @param {*} data 
 * @returns 
 */
 export function getParkInfo(data={}) {
  return request({
    url: '/api/ipark/order/getParkInfo',
    method: 'post',
    data
  })
}

/**
 * 停车订单增长率
 * @param {*} data 
 * @returns 
 */
 export function getParkIncome(data={}) {
  return request({
    url: '/api/ipark/order/getParkIncome',
    method: 'post',
    data
  })
}

/**
 * 出入场峰值分析
 * @param {*} data 
 * @returns 
 */
export function peakValue(data={}) {
  return request({
    url: '/api/ipark/order/peakValue',
    method: 'post',
    data
  })
}

/**
 * 停车记录
 * @param {*} data 
 * @returns 
 */
 export function parkingRecords(data={}) {
  return request({
    url: '/api/ipark/order/parkingRecords',
    method: 'post',
    data
  })
}

/**
 * 收入分析
 * @param {*} data 
 * @returns 
 */
 export function getTotal(data={}) {
  return request({
    url: '/api/ipark/order/getTotal',
    method: 'post',
    data
  })
}

/**
 * 获取车场图片列表
 * @param {*} data 
 * @returns 
 */
 export function getCarImage(data={}) {
  return request({
    url: '/api/ipark/order/carImage',
    method: 'post',
    data
  })
}
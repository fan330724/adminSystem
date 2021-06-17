import request from '@/axios/index'

/**
 * 年收入统计
 * @param {*} data 
 * @returns 
 */
export function annualIncome(data={}) {
  return request({
    url: '/api/ipark/order/annualIncome',
    method: 'post',
    data
  })
}

/**
 * 收入统计
 * @param {*} data 
 * @returns 
 */
export function getIncome(data={}) {
  return request({
    url: '/api/ipark/order/getIncome',
    method: 'post',
    data
  })
}

/**
 * 实时订单
 * @param {*} data 
 * @returns 
 */
export function currentTimeOrder(data={}) {
  return request({
    url: '/api/ipark/order/currentTimeOrder',
    method: 'post',
    data
  })
}

/**
 * 引流统计
 * @param {*} data 
 * @returns 
 */
export function statistics(data={}) {
  return request({
    url: '/api/ipark/order/statistics',
    method: 'post',
    data
  })
}

/**
 * 车流量排名
 * @param {*} data 
 * @returns 
 */
export function parkingRanking(data={}) {
  return request({
    url: '/api/ipark/order/ParkingRanking',
    method: 'post',
    data
  })
}

/**
 * 地图数据
 * @param {*} data 
 * @returns 
 */
export function queryMap(data={}) {
  return request({
    url: '/api/ipark/parkInfo/queryMap',
    method: 'post',
    data
  })
}


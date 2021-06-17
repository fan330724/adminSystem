import request from '@/axios/index'

/**
 * 车辆出入场峰值
 * @param {*} data 
 * @returns 
 */
export function getPeakValue(data) {
  return request({
    url: '/api/ipark/order/provincePeakValue',
    method: 'post',
    data
  })
}

/**
 * 停车场类型
 */
 export function parkType(data) {
  return request({
    url: '/api/ipark/parkInfo/parkType',
    method: 'post',
    data
  })
}

/**
 * 总停车位
 */
 export function ParkingSpace(data) {
  return request({
    url: '/api/ipark/parkInfo/queryRegionParking',
    method: 'post',
    data
  })
}

/**
 * 特殊车辆
 */
 export function specialCar(data) {
  return request({
    url: '/api/ipark/parkInfo/specialCar',
    method: 'post',
    data
  })
}

/**
 * 日停车时长
 */
 export function parkingHours(data) {
  return request({
    url: '/api/ipark/order/parkingHours',
    method: 'post',
    data
  })
}

/**
 * 停车场停车位缺口
 */
 export function parkingSpaceGap(data) {
  return request({
    url: '/api/ipark/order/parkingSpaceGap',
    method: 'post',
    data
  })
}

/**
 * 行驶轨迹
 */
 export function queryAreaParking(data) {
  return request({
    url: '/api/ipark/order/queryAreaParking',
    method: 'post',
    data
  })
}

/**
 * 行驶轨迹  搜索
 */
 export function ParkReferQuery(data) {
  return request({
    url: '/api/ipark/order/ParkReferQuery',
    method: 'post',
    data
  })
}
import request from '@/axios/index'

/**
 * 活跃用户数据
 * @param {*} data 
 * @returns 
 */
export function getActiveUser(data={}) {
  return request({
    url: '/api/park/user/activeUser',
    method: 'post',
    data
  })
}

/**
 * 停车用户数据
 * @param {*} data 
 * @returns 
 */
export function getUserCount(data={}) {
  return request({
    url: '/api/park/user/getUserCount',
    method: 'post',
    data
  })
}

/**
 * 福利数据
 * @param {*} data 
 * @returns 
 */
export function getUserMoney(data={}) {
  return request({
    url: '/api/park/user/getUserMoney',
    method: 'post',
    data
  })
}

/**
 * 会员办理
 * @param {*} data 
 * @returns 
 */
export function MemberData(data={}) {
  return request({
    url: '/api/park/user/MemberData',
    method: 'post',
    data
  })
}

/**
 * 优惠详情
 * @param {*} data 
 * @returns 
 */
export function offerDetails(data={}) {
  return request({
    url: '/api/park/user/offerDetails',
    method: 'post',
    data
  })
}


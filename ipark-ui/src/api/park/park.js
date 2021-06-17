
import request from '@/router/axios'

export function fetchPage(query) {
  return request({
    url: '/gate/gateparkinfo/page',
    method: 'get',
    params: query
  })
}

// export function fetchList(query) {
//   return request({
//     url: '/gate/gateparkinfo/list',
//     method: 'get',
//     params: query
//   })
// }

export function addObj(obj) {
  return request({
    url: '/gate/gateparkinfo',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/gate/gateparkinfo/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/gate/gateparkinfo/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/gate/gateparkinfo',
    method: 'put',
    data: obj
  })
}

export function getByUser(userId) {
  return request({
    url: '/gate/userParkInfo/getParkInfoByUserId/'+userId,
    method: 'get'
  })
}

/**
 * 岗亭人员上岗
 */

export function gateDuty() {
  return request({
    url: '/gate/person/changeAccount',
    method: 'get'
  })
}


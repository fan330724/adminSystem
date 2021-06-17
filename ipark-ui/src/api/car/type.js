/**
 * 车辆类型接口
 */
import request from '@/router/axios'

export function fetchPage(query) {
  return request({
    url: '/gate/cartype/page',
    method: 'get',
    params: query
  })
}

export function fetchList(query) {
  return request({
    url: '/gate/cartype/nopage',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/gate/cartype',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/gate/cartype/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/gate/cartype/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/gate/cartype',
    method: 'put',
    data: obj
  })
}

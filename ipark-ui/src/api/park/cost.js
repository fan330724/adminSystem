
import request from '@/router/axios'

export function fetchPage(query) {
  return request({
    url: '/gate/gatecalculatecost/list',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/gate/gatecalculatecost',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/gate/gatecalculatecost/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/gate/gatecalculatecost/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/gate/gatecalculatecost',
    method: 'put',
    data: obj
  })
}

/**
 * 更新计费规则的状态 
 */
export function updateStatus(query) {
  return request({
    url: '/gate/gatecalculatecost/existStatus',
    method: 'get',
    params: query
  })
}


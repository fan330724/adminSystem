
import request from '@/router/axios'

export function fetchPage(query) {
  return request({
    url: '/gate/gatesentrystatus/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/gate/gatesentrystatus',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/gate/gatesentrystatus/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/gate/gatesentrystatus/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/gate/gatesentrystatus',
    method: 'put',
    data: obj
  })
}

export function getByPark(obj) {
  return request({
    url: '/gate/gatesentrystatus/getGatesByParkId',
    method: 'get',
    params: obj
  })
}

//获取岗亭下的可通行车辆
export function getCarTypeBySentry(obj) {
  return request({
    url: '/gate/cartypesentry/getCarTypeListByGateId',
    method: 'get',
    params: obj
  })
}


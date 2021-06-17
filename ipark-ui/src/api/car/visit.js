
import request from '@/router/axios'

export function fetchPage(query) {
  return request({
    url: '/gate//gatecarmanrelease/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/gate//gatecarmanrelease',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/gate//gatecarmanrelease/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/gate//gatecarmanrelease/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/gate//gatecarmanrelease',
    method: 'put',
    data: obj
  })
}

export function download() {
  return request({
    url: '/gate//gatecarmanrelease/carProhibitList',
    method: 'get',
    responseType: 'blob'
  })
}

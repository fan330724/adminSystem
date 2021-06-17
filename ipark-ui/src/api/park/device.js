
import request from '@/router/axios'

export function fetchPage(query) {
  return request({
    url: '/gate/gatesentrycamera/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/gate/gatesentrycamera',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/gate/gatesentrycamera/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/gate/gatesentrycamera/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/gate/gatesentrycamera',
    method: 'put',
    data: obj
  })
}

export function downCode(query) {
  return request({
    url: '/gate/gateCode/download',
    method: 'get',
    responseType: 'arraybuffer',
    params: query
  })
}

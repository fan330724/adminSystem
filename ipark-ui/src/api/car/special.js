
import request from '@/router/axios'

export function fetchPage(query) {
  return request({
    url: '/gate/gatecarfixed/page',
    method: 'get',
    params: query
  })
}

export function fetchList(query) {
  return request({
    url: '/gate/gatecarfixed',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/gate/gatecarfixed',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/tenant/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/gate/gatecarfixed/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/gate/gatecarfixed',
    method: 'put',
    data: obj
  })
}

export function inloadData(data) {
  return request({
    url: '/gate/gatecarfixed/exportInputCarFixeds',
    method: 'post',
    data
  })
}

export function downloadData(query) {
  return request({
    url: '/gate/gatecarfixed/exportOutCarFixeds',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}



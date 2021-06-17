
import request from '@/router/axios'

export function fetchPage(query) {
  return request({
    url: '/gate/gatecarprohibit/page',
    method: 'get',
    params: query
  })
}

// export function fetchList(query) {
//   return request({
//     url: '/gate/gatecarprohibit/list',
//     method: 'get',
//     params: query
//   })
// }

export function addObj(obj) {
  return request({
    url: '/gate/gatecarprohibit',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/gate/gatecarprohibit/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/gate/gatecarprohibit/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/gate/gatecarprohibit',
    method: 'put',
    data: obj
  })
}

export function download(query) {
  return request({
    url: '/gate/gatecarprohibit/carProhibitList',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

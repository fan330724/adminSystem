
import request from '@/router/axios'

export function fetchPage(query) {
  return request({
    url: '/gate/gateparklot/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/gate/gateparklot',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/gate/gateparklot/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/gate/gateparklot/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/gate/gateparklot',
    method: 'put',
    data: obj
  })
}

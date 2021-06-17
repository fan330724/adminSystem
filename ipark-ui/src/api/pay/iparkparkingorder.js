import request from '@/router/axios'

/**
 * 获取停车记录数据
 */
export function getObj(obj) {
  return request({
    url: '/gate/record/parkingRecord',
    method: 'post',
    data: obj
  })
}

/**
 * 获取下拉菜单
 */
export function getToList(id,type){
  return request({
    url: '/gate/record/dropDownListBox/' + id + '/' + type,
    method: 'get'
  })
}

/**
 * 加入黑名单
 */
export function addblack(data){
  return request({
    url: '/gate/gatecarprohibit',
    method: 'post',
    data: data
  })
}

/**
 * 现金收款  人工放行
 */
export function editStatus(data){
  return request({
    url: '/gate/api/gateOut/entry/release',
    method: 'post',
    data: data
  })
}

/**
 * 查看详情
 */
export function getdetail(data){
  return request({
    url: '/gate/record/queryparkingID',
    method: 'post',
    data: data
  })
}
/**
 * @param {*} data 
 * post 手工入场   
 * put 修改车牌号
 */
export function gatecarparking(method,data){
  return request({
    url: '/gate/gatecarparking',
    method: method,
    data: data
  })
}

/**
 * 删除
 */
export function deleteMsgByEntity(data){
  return request({
    url: '/gate/gatecarparking/deleteMsgByEntity',
    method: 'post',
    data: data
  })
}

/**
 * 计费
 */
export function getCameraByGateId(id){
  return request({
    url: '/gate/gatesentrycamera/getCameraByGateId?id=' + id,
    method: 'get'
  })
}

/**
 * 计费
 */
export function carcache(data){
  return request({
    url: '/gate/api/gateOut/carcache',
    method: 'post',
    data
  })
}








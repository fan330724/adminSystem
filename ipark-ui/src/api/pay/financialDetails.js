
import request from '@/router/axios'

/**
 * 获取表格数据
 */
export function getObj(obj) {
  return request({
    url: '/gate/record/parkingFinanceRecord',
    method: 'post',
    data: obj
  })
}

/**
 * 导出表格数据
 */
export function downloadData(obj) {
  return request({
    url: '/gate/record/exportParkingIncome',
    method: 'post',
    responseType: 'blob',
    data: obj
  })
}




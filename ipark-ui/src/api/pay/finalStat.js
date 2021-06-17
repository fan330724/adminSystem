
import request from '@/router/axios'

/**
 * 获取车场收入日报数据（分页）
 */
export function getDailyList(data) {
  return request({
    url: '/paybiz/financial/parkIncome',
    method: 'post',
    data: data
  })
}
/**
 * 获取财务收入数据
 */
export function getIncomeData(obj) {
  return request({
    url: '/paybiz/financial/annualIncome',
    method: 'post',
    data: obj
  })
}

/**
 * 获取本月收入详细信息
 */
export function getIncomeDetail(data={}) {
  return request({
    url: '/paybiz/financial/monthlyIncome',
    method: 'post',
    data:data
  })
}

/**
 * 获取支付方式分布数据
 */

export function getPayTypeData(data={}) {
  return request({
    url: '/paybiz/financial/monthlyIncomePeak',
    method: 'post',
    data:data
  })
}

/**
 * 获取车场数据 
 */

export function getGateData(data={}) {
  return request({
    url: '/paybiz/financial/RightNavigation',
    method: 'post',
    data:data
  })
}

/**
 * 导出财务统计
 */
export function exportExcel(obj) {
  return request({
    url: '/paybiz/financial/exportParkIncome',
    method: 'post',
    data: obj,
    responseType: 'blob'
  })
}

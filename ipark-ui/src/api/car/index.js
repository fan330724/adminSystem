
import request from '@/router/axios'
/**
 * 获取车辆品牌列表
 */
export function getBrandList(query) {
  return request({
    url: '/gate/diccarbrand/getAllCarBrandPage',
    method: 'get',
    params: query
  })
}
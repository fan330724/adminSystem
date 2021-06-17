import request from '@/router/axios'

/**
 * 一键放行接口
 */
export function thepassage(data) {
  return request({
    url: '/gate/api/gateOut/entry/thepassage',
    method: 'post',
    data
  })
}
//停车场实时数据
export function ParkRealTimeData(query) {
  return request({
    url: '/gate/index/ParkRealTimeData',
    method: 'post',
    data: query
  })
}
//今日进场出场数据
export function RightNavigation(obj) {
  return request({
    url: '/gate/index/RightNavigation',
    method: 'post',
    data: obj
  })
}
//饼图数据
export function VehicleClassify(obj) {
  return request({
    url: '/gate/index/vehicleClassify',
    method: 'post',
    data: obj
  })
}
//车辆品牌饼图数据
export function VehicleBrand(obj) {
  return request({
    url: '/gate/index/vehicleBrand',
    method: 'post',
    data: obj
  })
}
//今日进场出场折线图数据
export function DataStatistics(obj) {
  return request({
    url: '/gate/index/dataStatistics',
    method: 'post',
    data: obj
  })
}

//饼图下方list列表30日数据
export function MonthVehicleEntry(obj) {
  return request({
    url: '/gate/index/monthVehicleEntry',
    method: 'post',
    data: obj
  })
}

//饼图下方list列表7日数据
export function WeekVehicleEntry(obj) {
  return request({
    url: '/gate/index/weekVehicleEntry',
    method: 'post',
    data: obj
  })
}

//下方折线图数据
export function monthLineCharty(obj) {
  return request({
    url: '/gate/index/MonthLineChart',
    method: 'post',
    data: obj
  })
}

//下方tab数据
export function getTab(id) {
  return request({
    url: `/gate/record/dropDownListBox/${id}/carType`,
    method: 'get',
  })
}



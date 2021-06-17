const BASIC_OPTION = {
  title: {
    text: '图表数据分析'
  },
  tooltip: {
    trigger: 'axis'
  },
  // legend: {
  //   data: []
  // },
  // toolbox: {
  //   feature: {
  //     saveAsImage: {}
  //   }
  // },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} M'
    }
  },
  series: []
}

export default {
  BASIC_OPTION
}
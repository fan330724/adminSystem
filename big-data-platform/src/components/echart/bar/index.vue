<template>
  <Echart
    :options="options"
    id="bar-chart"
    :height="height"
    :width="width"
    :openLoading="true"
  ></Echart>
</template>

<script>
import Echart from "@/common/echart";
import autoWidthMixins from "@/utils/echart/auto-width-mixins";
export default {
  mixins: [autoWidthMixins],
  data() {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({}),
    },
    height: {
      type: String,
    },
    width: {
      type: String,
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        this.setOptions(newData, "watch");
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    setOptions(newData, sign) {
      if (newData.seriesData && newData.seriesData.length === 0) {
        return;
      }
      if (!sign) {
        newData = this.cdata;
      }
      if (newData.colorList) {
        colorList = newData.colorList;
      }
      let xData = newData.xData,
        yData = newData.seriesData,
        yData1 = newData.lineData,
        yAxisName = newData.yAxisName,
        xAxisName = newData.xAxisName;
      let legendData = ["月收入", "增长率"];
      this.options = {
        backgroundColor: "transparent",
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            let html = params[0].name + '月' + '<br/>';
            params.forEach((item) => {
              let value = item.seriesType == 'bar'?item.seriesName + '：' + item.value + ' 元' : item.seriesName + '：' + item.value + '%'
              html += `
              <p>${value}</p>`;
            });
            return html;
          },
        },
        legend: {
          data: legendData,
          textStyle: {
            color: "#B4B4B4",
            fontSize: this.autoWidth(12),
          },
          top: "0",
          right: "3%",
          orient: "vertical",
          align: "right",
        },
        grid: {
          left: "1%",
          right: "4%",
          bottom: "0%",
          top: "32%",
          // height: "90%",
          containLabel: true,
          z: 22,
        },
        xAxis: [
          {
            name: xAxisName,
            type: "category",
            gridIndex: 0,
            data: xData,
            nameTextStyle: {
              color: "#fff",
              fontSize: this.autoWidth(12),
            },
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: "#0c3b71",
              },
            },
            axisLabel: {
              show: true,
              color: "rgb(170,170,170)",
              fontSize: this.autoWidth(12),
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: yAxisName,
            nameTextStyle: {
              color: "#fff",
              fontSize: this.autoWidth(12),
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#0c3b71",
              },
            },
            axisLabel: {
              color: "rgb(170,170,170)",
              formatter: "{value}",
              fontSize: this.autoWidth(12),
            },
          },
          {
            type: "value",
            name: "同比",
            splitNumber: 12,
            nameTextStyle: {
              fontSize: this.autoWidth(12),
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              formatter: "{value} %", //右侧Y轴文字显示
              fontSize: this.autoWidth(12),
              textStyle: {
                color: "#ebf8ac",
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
              },
            },
          },
        ],
        series: [
          {
            name: legendData[0],
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              normal: {
                barBorderRadius: this.autoWidth(20),
                textStyle: {
                  fontSize: this.autoWidth(12),
                },
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00feff",
                  },
                  {
                    offset: 0.5,
                    color: "#027eff",
                  },
                  {
                    offset: 1,
                    color: "#0286ff",
                  },
                ]),
              },
            },
            data: yData,
          },
          {
            name: legendData[1],
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true, //平滑曲线显示
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 2, //标记的大小
            itemStyle: {
              //折线拐点标志的样式
              color: "#FDC72E",
            },
            lineStyle: {
              color: "#FDC72E",
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: `rgba(250,209,51,0.5)`,
                    },
                    {
                      offset: 1,
                      color: `rgba(250,209,51,0.2)`,
                    },
                  ],
                  false
                ),
              },
            },
            data: yData1,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
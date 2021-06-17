<template>
  <Echart
    :options="options"
    id="bar-chart"
    :height="height"
    :width="width"
  ></Echart>
</template>

<script>
import Echart from "@/common/echart";
import autoWidthMixins from "@/utils/echart/auto-width-mixins";

let colorList = [
  {
    name: "#00CD9E",
    rgb: "0,205,158",
  },
  {
    name: "#F59D05",
    rgb: "245,157,5",
  },
];
let normalColor = "rgba(255,255,255,0.5)";
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
        if (newData.xData.length === 0) return;
        this.setOptions(newData, "watch");
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    setOptions(newData, sign) {
      if (!sign) {
        newData = this.cdata;
      }
      if (newData.colorList) {
        colorList = newData.colorList;
      }
      let legendData = ["月收入", "增长率"];
      this.options = {
        backgroundColor: "",
        xAxis: {
          data: newData.xData,
          axisLine: {
            lineStyle: {
              color: "#3d5269",
            },
          },
          axisLabel: {
            color: "#fff",
            fontSize: this.autoWidth(14),
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
          bottom: "2%",
          top: "23%",
          // height: "90%",
          containLabel: true,
          z: 22,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            let html = params[0].name + "月" + "<br/>";
            params.forEach((item) => {
              let value =
                item.seriesType == "bar"
                  ? item.seriesName + "：" + item.value + " 元"
                  : item.seriesName + "：" + item.value + "%";
              html += `
              <p>${value}</p>`;
            });
            return html;
          },
        },
        yAxis: [
          {
            type: "value",
            name: "收入/元",
            nameTextStyle: {
              color: "#fff",
              fontSize: this.autoWidth(12),
            },
            // min: 0,
            // max: 100,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: normalColor,
                fontSize: 12,
              },
            },
            axisTick: {
              show: false,
            },
          },
          {
            name: "同比",
            nameTextStyle: {
              color: "#fff",
              fontSize: this.autoWidth(12),
            },
            axisLine: {
              lineStyle: {
                color: "#3d5269",
              },
            },
            axisLabel: {
              color: "#fff",
              fontSize: this.autoWidth(12),
              show: true,
              formatter: "{value} %", //右侧Y轴文字显示
              textStyle: {
                color: "#ebf8ac",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#2d3d53",
              },
            },
            interval: 500,
          },
        ],
        series: [
          {
            name: legendData[0],
            type: "bar",
            barWidth: this.autoWidth(25),
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#5ef3ff",
                    },
                    {
                      offset: 1,
                      color: "#06a4f4",
                    },
                  ],
                  false
                ),
              },
            },
            // label: {
            //   normal: {
            //     show: true,
            //     fontSize: this.autoWidth(18),
            //     fontWeight: "bold",
            //     color: "#ffffff",
            //     position: "top",
            //   },
            // },
            data: newData.seriesData.data2,
          },
          {
            name: legendData[1],
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: false,
            symbol: "circle",
            symbolSize: 2,
            yAxisIndex: 1,
            lineStyle: {
              normal: {
                color: colorList[0].name,
              },
            },
            itemStyle: {
              color: colorList[0].name,
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
                      color: `rgba(${colorList[0].rgb},0.4)`,
                    },
                    {
                      offset: 1,
                      color: `rgba(${colorList[0].rgb},0)`,
                    },
                  ],
                  false
                ),
                shadowColor: `rgba(${colorList[0].rgb},0.9)`,
                shadowBlur: 20,
              },
            },
            data: newData.seriesData.data1,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
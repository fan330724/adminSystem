<template>
  <Echart
    :options="options"
    id="centreLeft1Chart"
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
        // console.log(newData);
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
      if (newData.xDate.length === 0) return;
      if (newData.colorList) {
        colorList = newData.colorList;
      }
      let isSmooth;
      if (newData.isSmooth === undefined) {
        isSmooth = true;
      } else {
        isSmooth = newData.isSmooth;
      }
      let series = this.setSeries(newData.data, isSmooth);
      let xDate = newData.xDate;
      let yAxisName = newData.yAxisName || "单位：辆";
      let xAxisName = newData.xAxisName || "时";
      this.options = {
        // backgroundColor: '#fff',
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0, 255, 233,0)",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(255, 255, 255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 255, 233,0)",
                  },
                ],
                global: false,
              },
            },
          },
        },
        legend: {
          textStyle: {
            color: "#B4B4B4",
            fontSize: this.autoWidth(12),
          },
          top: "5%",
          right: "3%",
          orient: "vertical",
          align: "right",
        },
        grid: {
          top: "25%",
          right: "7%",
          bottom: "5%",
          left: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            name: xAxisName,
            show: true,
            type: "category",
            nameTextStyle: {
              color: "#fff",
              fontSize: this.autoWidth(12),
            },
            axisLine: {
              show: false,
            },
            splitArea: {
              // show: true,
              color: "#fff",
              lineStyle: {
                color: "#fff",
              },
            },
            axisLabel: {
              color: "#fff",
            },
            splitLine: {
              show: false,
            },
            boundaryGap: false,
            data: xDate,
          },
        ],
        yAxis: [
          {
            name: yAxisName,
            // nameGap: "20",
            type: "value",
            nameTextStyle: {
              color: "#fff",
              fontSize: this.autoWidth(12),
            },
            // min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,0.1)",
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: series,
      };
    },
    //设置多条折线的判断
    setSeries(curData, isSmooth) {
      if (!curData) {
        return [];
      }
      let result = [];
      curData.forEach((i, idx) => {
        let seriesItem;
        if (!colorList[idx]) {
          seriesItem = {};
        } else {
          seriesItem = {
            name: i.name,
            type: "line",
            smooth: isSmooth, //是否平滑
            showAllSymbol: false,
            symbol: "circle",
            symbolSize: 2,
            lineStyle: {
              normal: {
                color: colorList[idx].name,
              },
            },
            itemStyle: {
              color: colorList[idx].name,
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
                      color: `rgba(${colorList[idx].rgb},0.4)`,
                    },
                    {
                      offset: 1,
                      color: `rgba(${colorList[idx].rgb},0)`,
                    },
                  ],
                  false
                ),
                shadowColor: `rgba(${colorList[idx].rgb},0.9)`,
                shadowBlur: 20,
              },
            },
            data: i.data,
          };
        }
        result.push(seriesItem);
      });
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
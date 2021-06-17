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
      let { xData, parkSpace, parkLot } = newData;
      this.options = {
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "5%",
          top: "30%",
          containLabel: true,
        },
        legend: {
          data: ["停车场缺口", "停车位缺口"],
          top: "5%",
          textStyle: {
            color: "#fff",
            fontSize: this.autoWidth(12),
          },
          itemGap: 35,
        },
        xAxis: {
          type: "category",
          data: xData,
          axisLine: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              fontFamily: "Microsoft YaHei",
              fontSize: this.autoWidth(12),
            },
          },
        },

        yAxis: {
          type: "value",
          name: "单位 : 个",
          nameTextStyle: {
            padding: [0, 0, 0, 0], // 四个数字分别为上右下左与原位置距离
            fontSize: this.autoWidth(12),
          },
          // nameGap:"40",
          axisLine: {
            show: false,
            lineStyle: {
              color: "white",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,0.3)",
            },
          },
          axisLabel: {
            show: true,
            fontSize: this.autoWidth(12),
          },
        },
        dataZoom: [
          {
            show: false,
            height: 12,
            xAxisIndex: [0],
            bottom: "8%",
            start: 10,
            end: 90,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5",
            },
            textStyle: {
              color: "#fff",
            },
            borderColor: "#90979c",
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35,
          },
        ],
        barGap: "100%",
        series: [
          {
            name: "停车场缺口",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#0294FF",
                  },
                  {
                    offset: 1,
                    color: "#0240FF",
                  },
                ]),
                barBorderRadius: 12,
              },
            },
            data: parkLot,
          },
          {
            name: "停车位缺口",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#26E597",
                  },
                  {
                    offset: 1,
                    color: "#079F90",
                  },
                ]),
                barBorderRadius: 11,
              },
            },
            data: parkSpace,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
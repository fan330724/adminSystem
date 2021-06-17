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

export default {
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
      if (newData.nameList && newData.nameList.length === 0) {
        return;
      }
      if (!sign) {
        newData = this.cdata;
      }
      if (newData.colorList) {
        colorList = newData.colorList;
      }
      let salvProName = newData.nameList;
      let salvProValue = JSON.parse(JSON.stringify(newData.valueList));
      function sortNumber(a, b) {
        return b - a;
      }
      salvProValue = salvProValue.sort(sortNumber);
      let salvProMax = []; //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0]);
      }
      this.options = {
        backgroundColor: "transparent",
        grid: {
          left: "2%",
          right: "2%",
          bottom: "1%",
          top: "2%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function (params) {
            return params[0].name + " : " + params[0].value + "辆";
          },
        },
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
              // formatter: "{value}",
              formatter: function (params) {
                // console.log(params);
                return params.substr(0, 4);
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: salvProName,
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12",
              },
              formatter: "{value} 辆",
            },
            data: salvProValue,
          },
        ],
        series: [
          {
            name: "值",
            type: "bar",
            zlevel: 1,
            barWidth: "50%",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgb(57,89,255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgb(46,200,207,1)",
                  },
                ]),
              },
            },
            data: salvProValue,
          },
          {
            name: "背景",
            type: "bar",
            barWidth: "50%",
            barGap: "-100%",
            data: salvProMax,
            itemStyle: {
              normal: {
                color: "rgba(24,31,68,1)",
                barBorderRadius: 30,
              },
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
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
      this.options = {
        backgroundColor: "transparent",
        tooltip: {
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
          formatter: function (params) {
            return `${params.name}</br>${params.seriesName} ：${params.value} 元`;
          },
        },
        grid: {
          containLabel: true,
          borderWidth: 0,
          top: "20%",
          bottom: "13%",
          left: "3%",
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          icon: "roundRect",
          orient: "horizontal",
          left: "center",
          top: "10",
          itemGap: this.autoWidth(20),
          textStyle: {
            color: "#90979c",
            fontSize:this.autoWidth(12)
          },
        },
        calculable: true,
        xAxis: [
          {
            name: "元",
            nameTextStyle: {
              padding: [this.autoWidth(28), 0, 0, this.autoWidth(10)],
              fontSize:this.autoWidth(12)
            },
            type: "value",
            trigger: "axis",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            // axisLabel: {
            //   interval: 0,
            // },
            axisLabel: {
              show: true,
              color: "rgb(170,170,170)",
              fontSize: this.autoWidth(12),
            },
          },
        ],
        yAxis: [
          {
            // name:'日期',
            type: "category",
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              show: false,
            },
            // axisLabel: {
            //   interval: 0,
            // },
            splitArea: {
              show: false,
            },
            axisLabel: {
              show: true,
              color: "rgb(170,170,170)",
              fontSize: this.autoWidth(12),
            },
            data: newData.xData,
          },
        ],
        series: [
          {
            name: "加油优惠",
            type: "bar",
            stack: "总量",
            barMaxWidth: this.autoWidth(10),
            barGap: "5%",
            itemStyle: {
              normal: {
                barBorderRadius: [0, this.autoWidth(10), this.autoWidth(10), 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgba(75,139,244,.1)",
                  },
                  {
                    offset: 0.3,
                    color: "rgba(75,139,244,.5)",
                  },
                  {
                    offset: 1,
                    color: "rgba(75,139,244,.9)",
                  },
                ]),
              },
            },
            data: newData.seriesData.comeOn,
          },
          {
            name: "停车优惠",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderRadius: [0, this.autoWidth(10), this.autoWidth(10), 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgba(26,161,95,.1",
                  },
                  {
                    offset: 0.3,
                    color: "rgba(26,161,95,.5)",
                  },
                  {
                    offset: 1,
                    color: "rgba(26,161,95,.9)",
                  },
                ]),
              },
            },
            data: newData.seriesData.stopCar,
          },
          {
            name: "洗车优惠",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderRadius: [0, this.autoWidth(10), this.autoWidth(10), 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgba(255,205,67,.1)",
                  },
                  {
                    offset: 0.3,
                    color: "rgba(255,205,67,.5)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255,205,67,.9)",
                  },
                ]),
              },
            },
            data: newData.seriesData.wash,
          },
          // {
          //     "name": "三级",
          //     "type": "bar",
          //     "stack": "总量",
          //     "itemStyle": {},
          //     "data": newData.seriesData3,
          // }
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
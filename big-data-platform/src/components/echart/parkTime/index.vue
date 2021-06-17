<template>
  <div>
    <Echart
      :options="options"
      id="centreLeft1Chart"
      :height="height"
      :width="width"
    ></Echart>
  </div>
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
      if (!sign) {
        newData = this.cdata;
      }
      var { xData, closed, roadside, closedCharge, roadsideCharge } = newData;
      var legend = ["路边泊车", "封闭式停车场"];
      let colors = [
        {
          borderColor: "#FFAA08",
          start: "#FFAA08",
          end: "#FDE77E",
        },
        {
          borderColor: "#0348FE",
          start: "#0348FE",
          end: "#01AAFD",
        },
      ];
      this.options = {
        baseOption: {
          backgroundColor: "transparent",
          title: {
            show: false,
          },
          timeline: {
            show: false,
            top: 0,
            data: [],
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          legend: [
            {
              top: "-1%",
              right: "2%",
              textStyle: {
                color: "#c9c9c9",
                fontSize: this.autoWidth(12),
              },
              data: legend,
            },
          ],
          grid: [
            {
              show: false,
              left: "3%",
              right: "8%",
              top: "12%",
              bottom: "2%",
              containLabel: true,
              width: "40%",
            },
            {
              show: false,
              left: "51%",
              top: "21%",
              bottom: "5%",
              width: "0%",
            },
            {
              show: false,
              right: "3%",
              top: "12%",
              bottom: "2%",
              containLabel: true,
              width: "40%",
            },
          ],
          barGap: "100%",
          xAxis: [
            {
              name: "总时长/时",
              nameLocation: "start",
              nameTextStyle: {
                padding: [-65, 0, 0, -40], // 四个数字分别为上右下左与原位置距离
                fontSize: this.autoWidth(12),
              },
              type: "value",
              inverse: true,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              position: "top",
              axisLabel: {
                show: true,
                color: "#c9c9c9",
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#324785",
                },
              },
              axisLabel: {
                // formatter: "{value}%",
                textStyle: {
                  color: "#c9c9c9",
                  fontSize: 12,
                },
              },
            },
            {
              gridIndex: 1,
              show: false,
            },
            {
              name: "停车费/千元",
              nameLocation: "start",
              nameTextStyle: {
                padding: [0, -40, 65, 0], // 四个数字分别为上右下左与原位置距离
                fontSize: this.autoWidth(12),
              },
              gridIndex: 2,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              position: "top",
              axisLabel: {
                show: true,
                color: "#c9c9c9",
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#324785",
                },
              },
              axisLabel: {
                // formatter: "{value}%",
                textStyle: {
                  color: "#c9c9c9",
                  fontSize: this.autoWidth(12),
                },
              },
            },
          ],
          yAxis: [
            {
              type: "category",
              inverse: true,
              position: "right",
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#324785",
                  fontSize: 12,
                },
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
                
              },
              data: xData,
            },
            {
              gridIndex: 1,
              type: "category",
              inverse: true,
              position: "left",
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                padding: [0, 0, 0, 0],
                textStyle: {
                  color: "#ffffff",
                  fontSize: this.autoWidth(12),
                },
                align: "center",
              },
              data: xData.map(function (value) {
                return {
                  value: value,
                  textStyle: {
                    align: "center",
                  },
                };
              }),
            },
            {
              gridIndex: 2,
              type: "category",
              inverse: true,
              position: "left",
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#324785",
                },
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              data: xData,
            },
          ],
          series: [
            {
              name: legend[0],
              type: "bar",
              barWidth: 5,
              stack: "1",
              barGap: "50%",
              // xAxisIndex: 1,
              // yAxisIndex: 1,
              itemStyle: {
                normal: {
                  fontSize: this.autoWidth(12),
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: colors[0].start,
                    },
                    {
                      offset: 1,
                      color: colors[0].end,
                    },
                  ]),
                },
              },
              label: {
                normal: {
                  show: false,
                },
              },
              data: closed,
              animationEasing: "elasticOut",
            },
            {
              name: legend[0],
              type: "bar",
              barGap: "50%",
              barWidth: 5,
              xAxisIndex: 2,
              yAxisIndex: 2,
              stack: "3",
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: colors[0].start,
                },
                {
                  offset: 1,
                  color: colors[0].end,
                },
              ]),
              label: {
                normal: {
                  show: false,
                },
              },
              data: closedCharge,
              animationEasing: "elasticOut",
            },
            {
              name: legend[1],
              type: "bar",
              barGap: "50%",
              stack: "2",
              barWidth: 5,
              // xAxisIndex: 1,
              // yAxisIndex: 1,
              itemStyle: {
                normal: {
                  fontSize: this.autoWidth(12),
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: colors[1].start,
                    },
                    {
                      offset: 1,
                      color: colors[1].end,
                    },
                  ]),
                },
              },
              label: {
                normal: {
                  show: false,
                },
              },
              data: roadside,
              animationEasing: "elasticOut",
            },
            {
              name: legend[1],
              type: "bar",
              barGap: "50%",
              barWidth: 5,
              xAxisIndex: 2,
              yAxisIndex: 2,
              stack: "4",
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: colors[1].start,
                },
                {
                  offset: 1,
                  color: colors[1].end,
                },
              ]),
              label: {
                normal: {
                  show: false,
                },
              },
              data: roadsideCharge,
              animationEasing: "elasticOut",
            },
          ],
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
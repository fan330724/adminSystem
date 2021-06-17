<template>
    <Echart
      :options="options"
      id="centreLeft1Chart"
      :height="height"
      :width="width"
      :auto="false"
    ></Echart>
</template>

<script>
import Echart from "@/common/echart";
import { autoWidth } from "@/utils/echart/auto-width";

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
      default: "100%",
    },
    width: {
      type: String,
      default: "100%",
    },
    auto: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        this.setOptions(newData,'watch');
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    window.addEventListener('resize', this.setOptions, false);
  },
  beforeDestroy() {
    window.removeEventListener('reisze', this.setOptions);
  },
  methods: {
    setOptions(newData,sign) {
      if(newData.total == 0){
        return
      }
      if(!sign){
        newData = this.cdata;
      };
      var dataArr = newData.part;
      var percent = newData.part/newData.total
      this.options = {
        backgroundColor: "transparent",
        title: {
          show: true,
          text: `平台用户 ${dataArr}`,
          x: "49%",
          y: "3.5%",
          z: 8,
          textAlign: "center",
          textStyle: {
            color: "#fff",
            fontSize: autoWidth(11),
          },
        },
        
        series: [
          {
            name: "内部进度条",
            type: "gauge",
            // center: ['20%', '50%'],
            radius: "100%",

            splitNumber: autoWidth(10),
            axisLine: {
              lineStyle: {
                color: [
                  [percent, "#00E9FF"],
                  [1, "#468EFD"],
                ],
                width: autoWidth(30),
              },
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              show: false
            },
            pointer: {
              show: false,
            },
          },

          /*内部*/
          {
            type: "pie",
            radius: ["0", "50%"],
            center: ["50%", "50%"],
            z: 8,
            hoverAnimation: true,
            data: [
              {
                name: "帷幄用户",
                value: dataArr,
                itemStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      1,
                      0,
                      0,
                      [
                        {
                          offset: 0,
                          color: "#4FADFD",
                        },
                        {
                          offset: 1,
                          color: "#28E8FA",
                        },
                      ]
                    ),
                  },
                },
                label: {
                  normal: {
                    rich: {
                      a: {
                        color: "#fff",
                        align: "center",
                        fontSize: '120%',
                        fontWeight: "bold",
                      },
                      span: {
                        color: "#468EFD",
                        lineHeight:autoWidth(30),
                        fontSize: '90%',
                        fontWeight: "bold"
                      }
                    },
                    formatter: function (params) {
                      return "{span|停车用户总数\n}"+"{a|" + newData.total + "人}";
                    },
                    position: "center",
                    show: true,
                  },
                },
                labelLine: {
                  show: false,
                },
              },
            ],
          },
          /*外一层*/
          {
            type: "pie",
            radius: "55%",
            startAngle: 220,
            endAngle: -40,
            hoverAnimation: false,
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 1,
              },
            ],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(69, 161, 255,0.8)",
                    },
                    {
                      offset: 1,
                      color: "rgba(69, 161, 255,0.5)",
                    },
                  ],
                },
              },
            },
          },
          //外二层圈
          {
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            z: 0,
            hoverAnimation: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 1,
              },
            ],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(69, 161, 255,0.5)",
                    },
                    {
                      offset: 1,
                      color: "rgba(69, 161, 255,0.3)",
                    },
                  ],
                },
              },
            },
          },
          //最外层圈
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            z: 0,
            hoverAnimation: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 1,
              },
            ],
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(69, 161, 255,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(69, 161, 255,0)",
                    },
                  ],
                },
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
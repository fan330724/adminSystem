<template>
  <div>
    <Echart
      :options="options"
      id="radarChart"
      :height="height"
      :width="width"
    ></Echart>
  </div>
</template>

<script>
import Echart from "@/common/echart";
import { formatTime } from "@/utils/index";
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
      if (newData.seriesData.length === 0) return;
      let valueList = newData.seriesData.map((i) => {
        // console.log(i);
        return i.value;
      });
      let nameList = newData.seriesData.map((i) => {
        return i.name;
      });
      let maxVal = Math.max(...valueList);
      let indicator = nameList.map((i) => {
        return {
          name: i,
          max: maxVal,
        };
      });
      this.options = {
        // backgroundColor: "#0A2E5D",
        tooltip: {
          show: true,
          // textStyle: {
          //   fontSize: 14,
          // },
          trigger: "item",
          // formatter: function () {
          //   for (let i = 0; i < newData.seriesData.length; i++) {
          //     return [
          //       newData.seriesData[i].name + ":" + newData.seriesData[i].value,
          //       // newData.seriesData[1].name + ":" + newData.seriesData[1].value,
          //       // newData.seriesData[2].name + ":" + newData.seriesData[2].value,
          //       // newData.seriesData[3].name + ":" + newData.seriesData[3].value,
          //       // newData.seriesData[4].name + ":" + newData.seriesData[4].value,
          //     ].join("<br/>");
          //   }
          // },
          // position: "right",
        },
        title: {
          text:
            "停车分布区域图 \n \n日期: " + formatTime(new Date(), "yyyy/MM/dd"),
          top: "20%",
          textStyle: {
            color: "#ffffff",
            fontSize: this.autoWidth(14),
            fontWeight: "normal",
            rich: {
              span: {
                backgroundColor: "rgba(108,254,255,1)",
                width: "5%",
                height: "5%",
                borderRadius: 50,
                fontSize: this.autoWidth(16),
                align: "center",
                verticalAlign: "middle",
                lineHeight: 74,
                padding: [0, 0, 5, 0],
              },
            },
          },
        },
        radar: {
          center: ["60%", "58%"],
          radius: "55%",
          splitNumber: 5,
          name: {
            textStyle: {
              color: "rgba(203, 221, 255, 1)",
              borderRadius: 3,
              fontSize: this.autoWidth(13),
              fontWeight: 600,
            },
          },
          nameGap: "15",
          indicator: indicator,
          // 圈圈网颜色
          splitLine: {
            show: true,
            lineStyle: {
              color: [
                "rgba(108, 254, 255, 0)",
                "rgba(108, 254, 255, 0.30196078431372547)",
                "rgba(108, 254, 255, 0.30196078431372547)",
                "rgba(108, 254, 255, 0.30196078431372547)",
                "rgba(108, 254, 255, 0.30196078431372547)",
              ],
              width: "1",
            },
          },
          splitArea: {
            areaStyle: {
              color: "rgba(119, 140, 162, 0.14)",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(0, 233, 234, 0.30196078431372547)",
            },
          },
        },
        series: [
          {
            name: newData.title,
            type: "radar",
            symbol: "circle",
            symbolSize: "8",
            label: {
              show: false,
              // 让它的点没有显示格式
              formatter: "",
              color: "#fff",
              fontStyle: {
                 fontSize: this.autoWidth(16),
              },
            },
            data: [
              {
                value: valueList,
                // name: newData.title,
                lineStyle: {
                  //网调线
                  color: "#6CFEFF",
                  // color: "rgba(108, 254, 255, 0.4)",
                  background:
                    "radial-gradient(circle, rgba(108, 254, 255, 0) 0%, rgba(108, 254, 255, 0.4) 100%)",
                },
                symbolSize: 8, //圆圈大小
                itemStyle: {
                  //调点的样式
                  show: true,
                  color: "rgba(108, 254, 255, 1)",
                  shadowColor: "rgba(108, 254, 255, 1)",
                  shadowBlur: 10,
                   fontSize: this.autoWidth(16),
                },
                areaStyle: {
                  // 内网颜色
                  normal: {
                    color: {
                      type: "radial",
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(108, 254, 255, 0)",
                        },
                        {
                          offset: 1,
                          color: "rgba(108, 254, 255, 0.4)",
                        },
                      ],
                      globalCoord: false,
                    },
                    opacity: 1,
                  },
                },
              },
            ],
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
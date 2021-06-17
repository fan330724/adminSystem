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
        this.setOptions(newData, "watch");
        // console.log(newData);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    setOptions(newData, sign) {
      if(newData.seriesData && newData.seriesData.length === 0){
        return;
      }
      if(!sign){
        newData = this.cdata;
      };
      var trafficWay = newData.seriesData;
      var data = [];
      var color = [
        "#ffa800", //橘色
        "#00ffff", //青色
        "#ffe000", //黄色
        "#22B04C", //绿色
        "#006ced", //蓝色
        "#00cfff", //蓝青
        "#ff5b00", //深橘色
      ];
      for (var i = 0; i < trafficWay.length; i++) {
        data.push({
          value: trafficWay[i].value,
          name: trafficWay[i].name,
          itemStyle: {
            normal: {
              borderWidth: 5,
              shadowBlur: 20,
              borderColor: color[i],
              shadowColor: color[i],
            },
          },
        });
      }
      var seriesOption = [
        {
          name: "支付类型",
          type: "pie",
          clockWise: false,
          radius: ["55%", "75%"],
          center: ["50%", "46%"],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: "outside",
                color: "#ddd",
                textStyle: {
                  fontSize: this.autoWidth(12)
                },
                formatter: function (params) {
                  var percent = 0;
                  var total = 0;
                  for (var i = 0; i < trafficWay.length; i++) {
                    total += trafficWay[i].value;
                  }
                  percent = ((params.value / total) * 100).toFixed(0);
                  if (params.name !== "") {
                    return params.name + "：" + percent + "%";
                  } else {
                    return "";
                  }
                },
              },
              labelLine: {
                length: this.autoWidth(10),
                length2: this.autoWidth(15),
                show: true,
                color: "#00ffff",
              },
            },
          },
          data: data,
        },
      ];
      this.options = {
        // backgroundColor: "#0A2E5D",
        color: color,
        title: {
          text: newData.title || "",
          subtext: newData.subTitle || "",
          left: "center",
          top: "40%", //top待调整
          textStyle: {
            color: "#fff",
            fontSize: this.autoWidth(15),
            fontFamily: "DINAlternate-Bold",
          },
          subtextStyle: {
            color: "#fff",
            fontSize: this.autoWidth(13),
            fontFamily: "PingFangSC-Regular",
            top: "center",
          },
          itemGap: 7, //主副标题间距
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "1%",
          top: "5%",
          containLabel: true,
        },
        // graphic: {
        //   elements: [
        //     {
        //       type: "image",
        //       z: 3,
        //       style: {
        //         image: img,
        //         width: "65%",
        //         height: "65%",
        //       },
        //       left: "center",
        //       top: "center",
        //       position: [100, 100],
        //     },
        //   ],
        // },
        tooltip: {
          trigger: "item",
          formatter: "{b} <br/> {c}元 <br/>( {d}% )",
        },
        // legend: {
        //   orient: "vertical",
        //   icon: "circle",
        //   top: 'middle',
        //   right:0,
        //   data: newData.xData,
        //   textStyle: {
        //     color: "#fff"
        //   }
        // },
        toolbox: {
          show: false,
        },
        series: seriesOption,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
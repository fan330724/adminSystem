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
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    setOptions(newData,sign) {
       if(newData.xData && newData.xData.length === 0){
        return;
      }
      if(!sign){
        newData = this.cdata;
      };
      var colorList = [
        {
          start: "#5558E7",
          end: "#6941FA",
        },
        {
          start: "#25CFB4",
          end: "#33DCA3",
        },
        {
          start: "#FFB00E",
          end: "#FFED8B",
        },
      ];
      this.options = {
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ["停车总用户", "帷幄用户", "优惠券用户"],
          textStyle: {
            color: "rgba(55,255,249,1)",
            fontSize: this.autoWidth(12),
          },
          top: "2%",
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "2%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: newData.xData,
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(55,255,249,1)",
              },
            },
            axisLabel: {
              rotate: 40,
              color: "rgba(55,255,249,1)",
              fontSize: this.autoWidth(12),
            },
          },
        ],
        yAxis: [
          {
            name: "用户数",
            nameGap: "26",
            type: "value",
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(55,255,249,1)",
              },
            },
            nameTextStyle:{
              padding:[0,30,0,0],
              fontSize: this.autoWidth(12),
            },
            axisLabel: {
              fontSize: this.autoWidth(12),
            },
          },
        ],
        series: [
          {
            name: "停车总用户",
            type: "bar",
            barWidth: "35%",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: colorList[0].start,
                },
                {
                  offset: 1,
                  color: colorList[0].end,
                },
              ]),
            },
            data: newData.parkData,
          },
          // {
          //   // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
          //   type: "bar",
          //   barWidth: "35%",
          //   barGap: "-100%",
          //   stack: "广告",
          //   itemStyle: {
          //     color: "transparent",
          //   },
          //   data: [100, 102, 81, 114, 70, 210, 190],
          // },
          {
            name: "帷幄用户",
            type: "bar",
            barWidth: "35%",
            barGap: "-100%",
            stack: "广告",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0.4,
                  color: colorList[1].start,
                },
                {
                  offset: 1,
                  color: colorList[1].end,
                },
              ]),
            },
            data: newData.userData,
          },
          {
            name: "优惠券用户",
            type: "bar",
            barWidth: "35%",
            barGap: "-100%",
            stack: "广告",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0.4,
                  color: colorList[2].start,
                },
                {
                  offset: 1,
                  color: colorList[2].end,
                },
              ]),
            },
            data: newData.discountData,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
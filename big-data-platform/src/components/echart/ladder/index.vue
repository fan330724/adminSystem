<template>
    <Echart
      :options="options"
      id=""
      :height="height"
      :width="width"
      :auto="true"
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
        this.options = {
          backgroundColor: "transparent",
          color: ["#FFCD43", "#8753BA", "#1AA15F", "#22A6F2"],

          series: [
            {
              name: "漏斗图",
              type: "funnel",
              x: "5%",
              y: '10%',
              //x2: 80,
              y2: '10%',
              width: "80%",
              // height: {totalHeight} - y - y2,
              min: 0,
              max: 100,
              minSize: "0%",
              maxSize: "100%",
              sort: "descending", // 'ascending', 'descending'
              gap: 0,

              data: [
                { value: 25, name: "洗车优惠券" },
                { value: 50, name: "加油优惠券" },
                { value: 75, name: "停车红包" },
                { value: 100, name: "福利用户" },
              ].sort(function (a, b) {
                return a.value - b.value;
              }),
              roseType: true,
              label: {
                normal: {
                  formatter: function (params) {
                    return params.name;
                  },
                  position: "center",
                },
              },
              itemStyle: {
                normal: {
                  borderWidth: 0,
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 5,
                  shadowColor: "rgba(0, 0, 0, 0.4)",
                },
              },
            },
          ],
        };
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
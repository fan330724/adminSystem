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
      console.log(newData);
      this.options = {
        color: [
          "#37a2da",
          "#32c5e9",
          "#9fe6b8",
          "#ffdb5c",
          "#ff9f7f",
          "#fb7293",
          "#e7bcf3",
          "#8378ea",
          "#34D160",
          "#8B00E1",
          "#6054FE",
          "#F19611",
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        title: {
          text: newData.title.REGION_NAME,
          subtext: '{a|'+ newData.title.space +'}{b| 个}',
          top: "center",
          left: "39%",
          textAlign: 'center',
          textStyle: {
            color: "#fff",
            fontSize: this.autoWidth(15),
            fontFamily: "DINAlternate-Bold",
            textAlign: 'center',
          },
          subtextStyle: {
            rich:{
              b:{
                fontSize: this.autoWidth(14)
              }
            },
            color: "#fff",
            fontSize: this.autoWidth(20),
            fontFamily: "PingFangSC-Regular",
            textAlign: 'center',
          },
          itemGap: 10, //主副标题间距
        },
        legend: {
          orient: "vertical",
          icon: "circle",
          top: "middle",
          right: "3%",
          textStyle: {
            color: "#fff",
            fontSize: this.autoWidth(12),
          },
          // formatter: function(params){
          //   debugger
          //   let {seriesData} = newData,
          //   value = '';
          //   seriesData.forEach(item => {
          //     if(item.name == params){
          //       value = item.value;
          //     }
          //   });
          //   return `${params}的占比\n ${value}个 36%`
	        	
          // },
        },
        series: [
          {
            name: "停车位",
            type: "pie",
            radius: ["50%", "90%"],
            center: ["40%", "55%"],
            roseType: "area",
            // center: ["50%", "50%"],
            labelLine: {
              show: false,
            },
            label: {
              show: false,
              position: "center",
            },
            data: newData.seriesData,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
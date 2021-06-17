<template>
  <div>
    <Chart :cdata="cdata" height="24vh" />
  </div>
</template>

<script>
import Chart from "@/components/echart/line/index.vue";
import { getPeakValue } from "@/api/first";
import {mapGetters} from 'vuex'
export default {
  props: {
    sign: {
      type: String,
      default: "all",
    },
  },
  data() {
    return {
      cdata: {
        xDate:[],
        data: [
          {
            name: "车辆入场峰值",
            data: [
              502.84,
              205.97,
              332.79,
              281.55,
              398.35,
              214.02,
              502.84,
              205.97,
            ],
          },
          {
            name: "车辆出场峰值",
            data: [
              281.55,
              398.35,
              214.02,
              502.84,
              205.97,
              502.84,
              205.97,
              332.79,
            ],
          },
        ],
      },
    };
  },
  components: {
    Chart,
  },
  computed:{
    ...mapGetters(["cityId","provinceId"]),
    cityid(){
      return {cityId:this.cityId,provinceId:this.provinceId}
    }
  },
  watch:{
    cityid(newV){
      if(newV){
        this.getObj()
      }
    }
  },
  mounted() {
    this.getObj();
  },
  methods: {
    getObj() {
      getPeakValue({provinceId:this.cityid.provinceId,cityId:this.cityid.cityId}).then((res) => {
        let data = res.data;
        let int = data.InPeakValue;
        let out = data.OutPeakValue;
        let x = data.x;

        this.cdata.yAxisName = "车/辆"
        this.cdata.xAxisData = x

        if (this.sign == "out") {
          this.cdata={
            xDate:x,
            data:[
              {
                name: "车辆出场峰值",
                data: out,
              },
            ],
            colorList :[
              {
                name: "#00CD9E",
                rgb: "0,205,158",
              }
            ]
          };
        } else if (this.sign === "in") {
          this.cdata={
            xDate:x,
            data:[
              {
                name: "车辆入场峰值",
                data: int,
              }
            ],
            colorList :[
              {
                name: "#F59D05",
                rgb: "245,157,5",
              }
            ]
          };
        } else {
          this.cdata={
            xDate:x,
            data:[
              {
                name: "车辆入场峰值",
                data: int,
              },
              {
                name: "车辆出场峰值",
                data: out,
              }
            ]
          };
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
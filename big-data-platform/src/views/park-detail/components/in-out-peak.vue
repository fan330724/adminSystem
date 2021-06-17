<template>
    <Chart :cdata="cdata" height="45vh"/>
</template>

<script>
import Chart from "@/components/echart/line/index.vue";
import { peakValue } from "@/api/detail"
export default {
  props:{
    sign:{
      type:String,
      default:'all'
    }
  },
  data() {
    return {
      cdata: {
        xAxisName:'时',
        data: [
          {
            name:'车辆入场峰值',
            data:[]
          },
          {
            name:'车辆出场峰值',
            data:[]
          }
        ],
        xDate:[]
      },
    };
  },
  components: {
    Chart,
  },
  mounted(){
    this.getData();
  },
  methods:{
    /**
    * 获取数据
    */
    getData(){
      let params = {
        parkId:'904'
      }
      peakValue(params).then(res=>{
        let data = res.data;
        this.cdata = {
          data: [
            {
              name:'入场峰值',
              data:data.InPeakValue
            },
            {
              name:'出场峰值',
              data:data.OutPeakValue
            }
          ],
          isSmooth:true,
          xDate:data.x
        };
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
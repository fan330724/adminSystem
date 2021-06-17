<template>
  <Chart :cdata="cdata" height="100%" />
</template>

<script>
import Chart from "@/components/echart/bar/bar-line.vue";
import { annualIncome } from '@/api/b-part'
export default {
  data() {
    return {
      cdata: {
        xData: [],
        seriesData: {
          data1: [],
          data2: [],
        },
      },
    };
  },
  components: {
    Chart,
  },
  mounted(){
    this.annualIncome();
  },
  methods: {
    /**
    * 获取收入统计数据
    */
    annualIncome(){
      let params = {
        parkId:'904'
      };
      annualIncome(params).then(res=>{
        let data = res.data;
        let seriesData = data.slice(0,data.length-1);
        let data1 = seriesData.map(i=>{
          return i.monthPeak;
        })
        let data2 = seriesData.map(i=>{
          return i.monthMoney;
        })
        let xData = data[data.length-1].x;
        this.cdata= {
          xData: xData,
          seriesData: {
            data1: data1,
            data2: data2
          },
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
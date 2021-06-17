<template>
  <div>
    <Chart :cdata="cdata" height="28vh"/>
  </div>
</template>

<script>
import Chart from '@/components/echart/bar/index.vue';
import { annualIncome } from '@/api/b-part'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      cdata: {
        xAxisName:'月',
        yAxisName:'月收入',
        xData: [],
        seriesData: [],
        lineData:[]
      },
    }
  },
  components: {
    Chart,
  },
  computed:{
    ...mapGetters(["bcityId"]),
    bcityid(){
      return this.bcityId
    }
  },
  watch:{
    bcityid(newV){
      if(newV){
        this.annualIncome()
      }
    }
  },
  mounted () {
    this.annualIncome();
  },
  methods: {
    /**
    * 获取收入统计数据
    */
    annualIncome(){
      let params = {
        regionCode: this.bcityid
      };
      annualIncome(params).then(res=>{
        let data = res.data;
        let seriesData = data.slice(0,data.length-1);
        this.cdata.seriesData = seriesData.map(i=>{
          return i.monthMoney;
        })
        this.cdata.lineData = seriesData.map(i => {
          return i.monthPeak;
        })
        this.cdata.xData = data[data.length-1].x;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
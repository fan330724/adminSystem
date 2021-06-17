<template>
  <Chart :cdata="cdata" height="100%"/>
</template>

<script>
import Chart from '@/components/echart/bar/discount.vue';
import { offerDetails } from "@/api/c-part"
export default {
  data () {
    return {
      cdata: {
        xData: [],
        seriesData: []
      }
    }
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
      offerDetails().then(res=>{
        if(res && res.data && res.data.length>0){
          let result = {
            xData:[],
            seriesData:{
              comeOn:[],
              stopCar:[],
              wash:[]
            }
          };
          let list = res.data;
          list.forEach(i=>{
            result.seriesData.comeOn.push(i.comeOn);
            result.seriesData.stopCar.push(i.stopCar);
            result.seriesData.wash.push(i.wash);
            result.xData.push(i.time);
          })
          this.cdata = result;
        }else{
          this.cdata= {
            xData:[],
            seriesData:{
              comeOn:[],
              stopCar:[],
              wash:[]
            }
          };
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
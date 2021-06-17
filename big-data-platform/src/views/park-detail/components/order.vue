<template>
    <Chart :cdata="cdata" height="100%"/>
</template>

<script>
import Chart from "@/components/echart/line/index.vue";
import { getParkIncome } from "@/api/detail"
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
        yAxisName:'订单量',
        data: [
          {
            name:'订单量',
            data:[]
          }
        ],
        isSmooth:false,
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
      getParkIncome(params).then(res=>{
        if(res && res.data){
          let dataList = [];
          let xDataList = [];
          res.data.forEach(i=>{
            dataList.push(i.counts);
            xDataList.push(i.createDate)
          })
          this.cdata = {
            data: [
              {
                name:'增长率',
                data:dataList
              }
            ],
            isSmooth:false,
            xDate:xDataList
          };
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
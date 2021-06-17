<template>
    <Chart :cdata="cdata" style="height:100%"/>
</template>

<script>
import Chart from '@/components/echart/bar/pile.vue';
import {statistics} from "@/api/b-part"

export default {
  data () {
    return {
      cdata: {
        xData: [],
        parkData: [],
        userData:[],
        discountData:[]
      }
    }
  },
  components: {
    Chart,
  },
  mounted () {
    this.getData()
  },
  methods: {
    /**
    * 获取引流数据
    */
    getData(){
      let params = {
        regionCode:'140100'
      };
      statistics(params).then(res=>{
        if(res && res.data){
          let list = {
            xData: [],
            parkData: [],
            userData:[],
            discountData:[]
          };
          res.data.forEach(i=>{
            list.xData.push(i.REGION_NAME);
            list.parkData.push(i.stopCarUser);
            list.userData.push(i.user);
            list.discountData.push(i.discountsUser);
          })
          this.cdata = list;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
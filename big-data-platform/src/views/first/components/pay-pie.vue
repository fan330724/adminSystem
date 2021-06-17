<template>
  <div>
    <Chart :cdata="cdata" height="24vh"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Chart from '@/components/echart/pie/pay-pie.vue';
import {parkType} from '@/api/first'
export default {
  data () {
    return {
      cdata: {
        seriesData: [
          { value: 10, name: "rose1" },
          { value: 5,  name: "rose2" },
          { value: 15, name: "rose3" },
          { value: 25, name: "rose4" },
          { value: 20, name: "rose5" },
          { value: 35, name: "rose6" }
        ]
      }
    }
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
        this.getData()
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData(){
      parkType({provinceId:this.cityid.provinceId,cityId:this.cityid.cityId}).then(res => {
        this.cdata.seriesData = res.data.map(v => {return {name:v.name,value:v.cityCount}});
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
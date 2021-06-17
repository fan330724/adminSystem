<template>
  <div>
    <Chart :cdata="cdata" height="24vh"/>
  </div>
</template>

<script>
import Chart from '@/components/echart/bar/park.vue';
import { mapGetters } from "vuex";
import { parkingSpaceGap } from "@/api/first";
export default {
  data () {
    return {
      cdata: {
        xData: [],
        parkLot:[],
        parkSpace:[]
      },
    }
  },
  components: {
    Chart,
  },
   computed: {
    ...mapGetters(["cityId", "provinceId"]),
    cityid() {
      return { cityId: this.cityId, provinceId: this.provinceId };
    },
  },
  watch: {
    cityid(newV) {
      if (newV) {
        this.getData();
      }
    },
  },
  mounted () {
    this.getData()
  },
  methods: {
     getData() {
      parkingSpaceGap({
        provinceId: this.cityid.provinceId,
        cityId: this.cityid.cityId,
      }).then((res) => {
        // console.log(res);
        this.cdata.xData = res.data.map(v => {return v.REGION_NAME})
        this.cdata.parkLot = res.data.map(v => {return v.parkLot})
        this.cdata.parkSpace = res.data.map(v => {return v.parkSpace})
      });
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
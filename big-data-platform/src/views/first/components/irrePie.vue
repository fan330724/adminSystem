<template>
  <div>
    <Chart :cdata="cdata" height="24vh" />
  </div>
</template>

<script>
import Chart from "@/components/echart/pie/index.vue";
import { mapGetters } from "vuex";
import { ParkingSpace } from "@/api/first";
export default {
  data() {
    return {
      cdata: {
        title: {},
        freeData:{},
        seriesData: [],
      },
    };
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
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      ParkingSpace({
        provinceId: this.cityid.provinceId,
        cityId: this.cityid.cityId,
      }).then((res) => {
        console.log(res.data);
        if (res && res.data) {
          this.cdata.seriesData = res.data.map((v) => {return { name: v.REGION_NAME, value: v.space };}).splice(0, res.data.length - 1);
          this.cdata.title = res.data[res.data.length - 1];
          this.cdata.freeData = {name:res.data[res.data.length - 2].REGION_NAME,value:res.data[res.data.length - 2].space};
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
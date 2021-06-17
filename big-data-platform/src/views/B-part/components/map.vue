<template>
  <Chart :cdata="cdata" :height="'100%'" />
</template>

<script>
import Chart from "@/components/echart/map/city.vue";
import { queryMap } from "@/api/b-part";

export default {
  data() {
    return {
      cdata: {
        citys: [],
        moveLines: [],
      },
    };
  },
  components: {
    Chart,
  },
  mounted() {
    this.getData();
  },
  methods: {
    /**
     * 获取地图数据
     */
    getData() {
      queryMap().then((res) => {
        if (res && res.data) {
          let data = res.data.slice(0, 150);
          this.cdata.citys = data.map((i) => {
            return {
              name: i.name,
              value: [i.lon, i.lat, Number(i.space || 0)],
              symbolSize: 8,
              itemStyle: {
                normal: {
                  color: "#F4E925",
                  shadowBlur: 5,
                  shadowColor: "#333",
                },
              },
            };
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
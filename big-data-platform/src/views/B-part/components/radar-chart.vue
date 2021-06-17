<template>
  <div>
    <Chart :cdata="cdata" height="24vh"/>
  </div>
</template>

<script>
import Chart from '@/components/echart/radar/index.vue';
export default {
  data () {
    return {
      cdata: {
        title:'停车轨迹',
        seriesData: [
          { value: 10, name: "迎泽区" },
          { value: 5, name: "杏花岭区" },
          { value: 15, name: "尖草坪区" },
          { value: 25, name: "小店区" },
          { value: 20, name: "晋源区" },
          { value: 35, name: "万柏林区" }
        ]
      }
    }
  },
  components: {
    Chart,
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
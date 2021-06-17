<template>
    <Chart :cdata="cdata" id="centerCity"/>
</template>

<script>
import Chart from '@/components/echart/map/index.vue';
export default {
  data () {
    return {
      cdata: [
        {
          // 名字需要与 “common/map/fujian.js” 地图数据文件里面定义的一一对应，不能是 “福州” 或者 “闽” 之类的缩写
          name: '山西省',
          value: 10,
          elseData:{
            // 这里放置地图 tooltip 里想显示的数据
          }
        },
        {
          name: '太原市',
          value: 9,
        },
        {
          name: '阳泉市',
          value: 8,
        },
        {
          name: '大同市',
          value: 7,
        },
        {
          name: '长治市',
          value: 6,
        },
        {
          name: '晋城市',
          value: 5,
        },
        {
          name: '朔州市',
          value: 4,
        },
        {
          name: '晋中市',
          value: 3,
        },
        {
          name: '忻州市',
          value: 2,
        },
        {
          name: '临汾市',
          value: 3,
        },
        {
          name: '运城市',
          value: 53,
        },
        {
          name: '吕梁市',
          value: 12,
        }
      ]
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
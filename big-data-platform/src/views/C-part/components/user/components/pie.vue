<template>
  <div>
    <Chart :cdata="cdata" height="25vh"/>
  </div>
</template>

<script>
import Chart from '@/components/echart/pie/oil.vue';
export default {
  props:{
    cdata:{
      type:Object,
      default:{
        total:0,
        part:0
      }
    },
    stopUser:{
      type:Number,
      default:0
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
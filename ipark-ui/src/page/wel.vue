<template>
  <div class="container">
    <top-comp></top-comp>
    <pie-comp></pie-comp>
    <data-statistics></data-statistics>
    <date-echart></date-echart>
  </div>
</template>

<script>
import topComp from './welComponent/top/top'
import pieComp from './welComponent/pieComp/pieComp'
import dateEchart from './welComponent/dateEchart/dateEchart'
import dataStatistics from './welComponent/dataStatistics/dataStatistics'
export default {
  name:"wel",
  components: {
    topComp,
    pieComp,
    dateEchart,
    dataStatistics
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0px 20px 3%;
}
</style>
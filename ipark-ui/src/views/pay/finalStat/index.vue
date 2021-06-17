<template>
  <div class="container">
    <top-comp></top-comp>
    <park-comp></park-comp>
    <income-comp></income-comp>
  </div>
</template>

<script>
  import topComp from './components/top/index'
  import parkComp from './components/park/index'
  import incomeComp from './components/income/index'
export default {
  components:{
    topComp,
    parkComp,
    incomeComp
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding:10px 1% 3%;
  }
</style>
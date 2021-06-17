<template>
  <div class="no-data-part">
    <img src="/img/until/no_data.svg" alt="" class="img">
    <div class="text">暂无数据</div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  .no-data-part {
    text-align: center;
    .img {
      width:16%;
      height:24vh;
      position: relative;
      left:-1%;
    }
    .text {
      font-size: 18px;
      font-weight: 600;;
      color:#a9a9a9;
      letter-spacing: 10px;
    }
  }
</style>
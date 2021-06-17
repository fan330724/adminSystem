<template>
  <div class="header flex flex-dir-row">

    <div class="bound-part">
      <dv-decoration-6 class="cum-deco-1 left-1" />
      <dv-decoration-8 class="cum-deco-10" style="transform: rotateY(180deg);"/>
    </div>

    <div class="center-part flex-center flex-dir-column">

      <!-- <dv-decoration-8 :color="['#568aea', '#000000']" class="cum-deco-8 left-8" /> -->

        <!-- <dv-decoration-7> -->
            <img class="title-text" src="../../assets/images/layout/header.png" alt="">
        <!-- </dv-decoration-7> -->
        
        <dv-decoration-5
          class="title-bottom"
          :reverse="true"
        />

      <!-- <dv-decoration-8
        :reverse="true"
        :color="['#568aea', '#000000']"
        class="cum-deco-8 right-8"
      /> -->
      
    </div>

    <div class="bound-part">
      <dv-decoration-6 class="cum-deco-1 right-1" />
      <dv-decoration-8 class="cum-deco-10"/>
    </div>

  </div>
</template>

<script>
  export default {

  }
</script>

<style lang='scss' scoped>
  .header{
    height:60px;
  }

  .center-part {
    position: relative;
    width: 20%;
    .cum-deco-8 {
      position: absolute;
      width:40px;
      &.left-8{
        left:0;
      }
      &.right-8{
        right:0;
      }
    }
    .title-text {
      // display: inline-block;
      // font-size: 25px;
      // font-weight: 600;
      // padding:0 10px;
      // color:#7EC699;
      width:350px;
      height:45px;
    }

    .title-bottom {
      width:100%;
      height:20px;
    }
  }

  .bound-part {
    position: relative;
    width:40%;
    .cum-deco-1 {
      position: absolute;
      top:0;
      height:25px;
      width:400px;
      &.left-1{
        right:170px;
      }
      &.right-1{
        left:170px;
      }
    }
    .cum-deco-10 {
      width:100%;
      height:40px;
      position: relative;
      top:6.5px;
    }
  }


</style>
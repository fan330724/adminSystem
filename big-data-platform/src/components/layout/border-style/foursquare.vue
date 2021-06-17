<template>
  <div class="contain">
    <span :style="{'border-color':color}"></span>
    <span :style="{'border-color':color}"></span>
    <span :style="{'border-color':color}"></span>
    <span :style="{'border-color':color}"></span>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props:{
      color:{
        type:String,
        default:'#00EDF4'
      }
    }
  };
</script>

<style lang='scss' scoped>
.contain {
  position: relative;

  span:nth-child(1) {
    position: absolute;
    left: -1px;
    top: -1px;
    padding: 3px;
    border-style: solid;
    
    border-width: 2px 0 0 2px;
  }
  span:nth-child(2) {
    position: absolute;
    right: -1px;
    top: -1px;
    padding: 3px;
    border-style: solid;
    border-width: 2px 2px 0 0;
  }

  span:nth-child(3) {
    position: absolute;
    right: -1px;
    bottom: -1px;
    padding: 3px;
    border-style: solid;
    border-width: 0 2px 2px 0;
  }

  span:nth-child(4) {
    position: absolute;
    left: -1px;
    bottom: -1px;
    padding: 3px;
    border-style: solid;
    border-width: 0 0 2px 2px;
  }
}
</style>
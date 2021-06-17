<template>
  <div class="part">
    <slot></slot>
    <div class="part-border">
      <div class="part-border1"></div>
      <div class="part-border-left"></div>
      <div class="part-border-right"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.part {
  text-align: center;
  color: #00F4FC;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
  .part-border {
    width: 300px;
    margin: 0 auto;
    position: relative;
    bottom: 5px;
    height: 2px;
    background: #00F4FC;
    .part-border-left {
      position: absolute;
      left: -21px;
      top: -8.5px;
      width: 26px;
      height: 2px;
      background: #00F4FC;
      transform: rotate(45deg);
      border-bottom-right-radius: 5px;
    }
    .part-border-right {
      position: absolute;
      right: -21px;
      top: -8.5px;
      width: 26px;
      height: 2px;
      background: #00F4FC;
      transform: rotate(-45deg);
      border-bottom-left-radius: 5px;
    }
  }
  .part-border1 {
    width: 300px;
    margin: 0 auto;
    margin-top: 15px;
    position: relative;
    height: 2px;
    background: #00F4FC;
    overflow: hidden;
    &::after {
      content: "";
      width: 60px;
      margin: 0 auto;
      height: 6px;
      background: linear-gradient(-90deg, #62a5e9, #cfe9fb, #62a5e9);
      position: absolute;
      top: -1px;
      left: 50%;
      transform: translateX(-50%);
      display: inline-block;
      box-sizing: border-box;
      transition: 3s all cubic-bezier(0.46, 1, 0.23, 1.52);
      animation: identifier 1.5s ease-in-out infinite alternate;
    }
  }
}
@keyframes identifier {
  0% {
    width: 60px;
  }
  25% {
    width: 100px;
  }
  50% {
    width: 140px;
  }
  75% {
    width: 180px;
  }
  100% {
    width: 100%;
  }
}
</style>
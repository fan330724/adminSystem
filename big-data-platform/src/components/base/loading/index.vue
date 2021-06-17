<template>
  <div class="loading-box" v-if="show">
    <div class="loading-mask"></div>
    <div class="loading-main">
      <!-- <div class="loading-icon"></div>
      <div class="loading-txt">{{txt}}</div> -->
      <div class="loader loader-2">
        <svg class="loader-star">
          <polygon
            points="29.8 0.3 22.8 21.8 0 21.8 18.5 35.2 11.5 56.7 29.8 43.4 48.2 56.7 41.2 35.1 59.6 21.8 36.8 21.8 "
            fill="#FFCD42"
          />
        </svg>
        <div class="loader-circles"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    txt: {
      type: String,
      default: "加载中...",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang='scss' scoped>
.loading-box {
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  .loading-main {
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    z-index: 2;
  }
}
.loading-mask {
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.4);
  z-index: 1;
}
.loader {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 75px;
  display: inline-block;
  vertical-align: middle;
}
.loader-star {
  position: absolute;
  top: calc(50% - 12px);
}
.loader-2 .loader-star {
  position: static;
  width: 60px;
  height: 60px;
  -webkit-transform: scale(0.7);
  transform: scale(0.7);
  -webkit-animation: loader-2-star 1s ease alternate infinite;
  animation: loader-2-star 1s ease alternate infinite;
}
.loader-2 .loader-circles {
  width: 8px;
  height: 8px;
  background: #FFCD42;
  border-radius: 50%;
  position: absolute;
  left: calc(50% - 4px);
  top: calc(50% - 4px);
  -webkit-transition: all 1s ease;
  transition: all 1s ease;
  -webkit-animation: loader-2-circles 1s ease-in-out alternate infinite;
  animation: loader-2-circles 1s ease-in-out alternate infinite;
}

@-webkit-keyframes loader-2-star {
  0% {
    -webkit-transform: scale(0) rotate(0deg);
    transform: scale(0) rotate(0deg);
  }
  100% {
    -webkit-transform: scale(0.7) rotate(360deg);
    transform: scale(0.7) rotate(360deg);
  }
}
@keyframes loader-2-star {
  0% {
    -webkit-transform: scale(0) rotate(0deg);
    transform: scale(0) rotate(0deg);
  }
  100% {
    -webkit-transform: scale(0.7) rotate(360deg);
    transform: scale(0.7) rotate(360deg);
  }
}

@-webkit-keyframes loader-2-circles {
  0% {
    box-shadow: 0 0 0 #FFCD42;
    opacity: 1;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    box-shadow: 24px -22px #FFCD42, 30px -15px 0 -3px #FFCD42, 31px 0px #FFCD42,
      29px 9px 0 -3px #FFCD42, 24px 23px #FFCD42, 17px 30px 0 -3px #FFCD42,
      0px 33px #FFCD42, -10px 28px 0 -3px #FFCD42, -24px 22px #FFCD42,
      -29px 14px 0 -3px #FFCD42, -31px -3px #FFCD42, -30px -11px 0 -3px #FFCD42,
      -20px -25px #FFCD42, -12px -30px 0 -3px #FFCD42, 5px -29px #FFCD42,
      13px -25px 0 -3px #FFCD42;
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    opacity: 0;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    box-shadow: 25px -22px #FFCD42, 15px -22px 0 -3px black, 31px 2px #FFCD42,
      21px 2px 0 -3px black, 23px 25px #FFCD42, 13px 25px 0 -3px black,
      0px 33px #FFCD42, -10px 33px 0 -3px black, -26px 24px #FFCD42,
      -19px 17px 0 -3px black, -32px 0px #FFCD42, -23px 0px 0 -3px black,
      -25px -23px #FFCD42, -16px -23px 0 -3px black, 0px -31px #FFCD42,
      -2px -23px 0 -3px black;
  }
}
@keyframes loader-2-circles {
  0% {
    box-shadow: 0 0 0 #FFCD42;
    opacity: 1;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    box-shadow: 24px -22px #FFCD42, 30px -15px 0 -3px #FFCD42, 31px 0px #FFCD42,
      29px 9px 0 -3px #FFCD42, 24px 23px #FFCD42, 17px 30px 0 -3px #FFCD42,
      0px 33px #FFCD42, -10px 28px 0 -3px #FFCD42, -24px 22px #FFCD42,
      -29px 14px 0 -3px #FFCD42, -31px -3px #FFCD42, -30px -11px 0 -3px #FFCD42,
      -20px -25px #FFCD42, -12px -30px 0 -3px #FFCD42, 5px -29px #FFCD42,
      13px -25px 0 -3px #FFCD42;
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    opacity: 0;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    box-shadow: 25px -22px #FFCD42, 15px -22px 0 -3px black, 31px 2px #FFCD42,
      21px 2px 0 -3px black, 23px 25px #FFCD42, 13px 25px 0 -3px black,
      0px 33px #FFCD42, -10px 33px 0 -3px black, -26px 24px #FFCD42,
      -19px 17px 0 -3px black, -32px 0px #FFCD42, -23px 0px 0 -3px black,
      -25px -23px #FFCD42, -16px -23px 0 -3px black, 0px -31px #FFCD42,
      -2px -23px 0 -3px black;
  }
}
</style>
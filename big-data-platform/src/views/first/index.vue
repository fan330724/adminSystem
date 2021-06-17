<template>
  <div class="contain">
    <!-- <dv-full-screen-container class="bg"> -->
    <dv-loading v-if="loading">Loading...</dv-loading>
    <div v-else class="flex flex-dir-column host-body">
      <header-comp></header-comp>
      <main class="flex flex-1">
        <div class="branch-part left flex flex-dir-column">
          <div class="income-part trans-border">
              <animation-border>
                <p class="part-title">停车场类型</p>
              </animation-border>
              <pay-pie-comp></pay-pie-comp>
          </div>

          <div class="park-part trans-border">
              <animation-border>
                <p class="part-title">总停车位</p>
              </animation-border>
              <irre-pie></irre-pie>
          </div>

          <div class="special-part flex-1 trans-border">
              <animation-border>
                <p class="part-title">特殊车辆</p>
              </animation-border>
              <special-car-comp></special-car-comp>
          </div>
        </div>
        <div class="branch-part center flex flex-dir-column">
          <div class="map-part trans-border">
              <animation-border>
                <p class="part-title">车场分布</p>
              </animation-border>
              <map-comp></map-comp>
          </div>

          <div class="park-time-part flex-1 trans-border">
              <div class="part-wrap flex flex-dir-column">
                <animation-border>
                  <p class="part-title">日停车总时长</p>
                </animation-border>
                <park-time-comp></park-time-comp>
              </div>
          </div>
        </div>
        <div class="branch-part right flex flex-dir-column">
          <div class="park-in-part trans-border">
              <animation-border>
                <p class="part-title">车辆入场/出场峰值</p>
              </animation-border>
              <line-chart></line-chart>
          </div>

          <div class="park-out-part trans-border">
              <animation-border>
                <p class="part-title">停车场/停车位缺口</p>
              </animation-border>
              <park></park>
          </div>

          <div class="park-track-part trans-border">
              <radar-chart sign="out"></radar-chart>
          </div>
        </div>
      </main>
      <div></div>
    </div>
    <!-- </dv-full-screen-container> -->
  </div>
</template>

<script>
import headerComp from "@/components/layout/header";

import irrePie from "./components/irrePie";
import payPieComp from "./components/pay-pie";
import mapComp from "./components/map";

import parkTimeComp from "./components/park-time.vue";
import specialCarComp from "./components/special-car.vue";
import park from "./components/park"

import lineChart from "./components/line-chart.vue";
import radarChart from "./components/radar-chart.vue";

import { formatTime } from "@/utils/index.js";

import animationBorder from "@/components/animationBoder/index";
export default {
  data() {
    return {
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      config: {},
    };
  },
  components: {
    parkTimeComp,
    lineChart,
    radarChart,
    specialCarComp,
    headerComp,
    irrePie,
    payPieComp,
    mapComp,
    animationBorder,
    park
  },
  mounted() {
    this.timeFn();
    this.cancelLoading();
  },
  methods: {
    timeFn() {
      setInterval(() => {
        this.dateDay = formatTime(new Date(), "HH: mm: ss");
        this.dateYear = formatTime(new Date(), "yyyy-MM-dd");
        this.dateWeek = this.weekday[new Date().getDay()];
      }, 1000);
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.contain {
  color: #d3d6dd;
  background-image: url("../../assets/images/bj.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  padding: 10px;
  .host-body {
    height: 100%;
    main {
      .branch-part {
        // border:1px solid #000;
        &.center {
          width: 44%;
          margin: 0 15px;
          flex-grow: 1;
          flex-shrink: 0;
        }
        &.left {
          width: 27%;
        }
        &.right {
          width: 27%;
        }
      }
    }
  }
  .income-part {
    height: 28vh;
    .cum-dv-ring-chart {
      width: 100%;
      height: 100%;
    }
  }
  .park-part {
    margin-top: 1vh;
  }

  .park-time-part {
    margin-top: 1vh;
    .part-wrap {
      height: 100%;
    }
  }

  .map-part {
    height:60vh;
  }

  .special-part {
    margin-top: 1vh;
  }

  .park-out-part {
    margin-top: 1vh;
  }

  .park-track-part {
    margin-top: 1vh;
    flex: auto;
  }
}
</style>
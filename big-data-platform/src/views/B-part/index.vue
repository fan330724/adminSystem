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
                <p class="part-title">年收入统计</p>
              </animation-border>
              <div class="part-content">
                <pay-pie-comp></pay-pie-comp>
                <income-bar-comp class="income-bar"></income-bar-comp>
              </div>
             
          </div>

          <div class="order-part trans-border">
              <div class="border-wrap">
                <animation-border>
                  <p class="part-title">实时订单</p>
                </animation-border>
                <div class="border-chart">
                  <order-list-comp></order-list-comp>
                </div>
              </div>
          </div>
        </div>
        <div class="branch-part center flex flex-dir-column">
          <div class="map-part trans-border">
              <div class="border-wrap">
                <animation-border>
                  <p class="part-title">车场分布</p>
                </animation-border>
                <div class="border-chart">
                  <map-comp></map-comp>
                </div>
              </div>
          </div>
        </div>
        <div class="branch-part right flex flex-dir-column">
          <div class="drain-part trans-border">
            <div class="border-wrap">
              <animation-border>
                <p class="part-title">帷幄引流统计</p>
              </animation-border>
              <div class="border-chart">
                <drain-bar-comp></drain-bar-comp>
              </div>
            </div>
          </div>

          <div class="rank-part trans-border">
            <div class="border-wrap">
              <animation-border>
                <p class="part-title">车场流量排名</p>
              </animation-border>
              <div class="border-chart">
                <rank-bar-comp sign="out"></rank-bar-comp>
              </div>
            </div>
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

import payPieComp from "./components/pay-pie";
import incomeBarComp from "./components/income-bar-chart";
import orderListComp from "./components/order-list.vue";

import mapComp from "./components/map";

import drainBarComp from "./components/drain-bar-chart";
import rankBarComp from "./components/rank-bar-chart";

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
    orderListComp,
    headerComp,
    payPieComp,
    incomeBarComp,
    mapComp,
    drainBarComp,
    rankBarComp,
    animationBorder,
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
  overflow: hidden;
  padding: 10px;
  .host-body {
    height: 100%;
    main {
      .branch-part {
        &.center {
          margin: 0 15px;
          flex-grow: 1;
          flex-shrink: 0;
        }
        &.left {
          width: 20%;
        }
        &.right {
          width: 23%;
        }
      }
    }
  }
  .income-part {
    height: 62vh;
    .part-content {
      margin-top:20px;
      .income-bar {
        // margin-top:15px;
      }
    }
  }
  .order-part {
    margin-top: 2vh;
    flex: 1 0 auto;
    height:0;
    .border-box-content {
      padding:0 !important;
    }
  }

  .map-part {
    flex: 1 1 auto;
  }

  .drain-part {
    height: 48vh;
  }

  .rank-part {
    margin-top: 2vh;
    flex: 1 1 auto;
    height:0;
  }
}
</style>
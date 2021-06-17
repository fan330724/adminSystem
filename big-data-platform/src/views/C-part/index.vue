<template>
  <div class="contain">
    <!-- <dv-full-screen-container class="bg"> -->
    <dv-loading v-if="loading">Loading...</dv-loading>
    <div v-else class="flex flex-dir-column host-body">
      <header-comp></header-comp>
      <main class="flex flex-1">
        <div class="branch-part left flex flex-dir-column trans-border">
          <animation-border>
            <p class="part-title">帷幄停车用户数据</p>
          </animation-border>
          <div class="user-part">
              <user-comp></user-comp>
          </div>

           <div class="active-user-part">
              <active-user-comp></active-user-comp>
          </div>

        </div>
        <div class="branch-part center flex flex-dir-column trans-border">
          <div class="map-part">
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
        <div class="branch-part right flex flex-dir-column trans-border">

          <animation-border>
            <p class="part-title">帷幄福利数据</p>
          </animation-border>
          <div class="welfare-part">
            <welfare-comp></welfare-comp>   
          </div>

           <p class="part-sub-title"><span class="txt">会员办理</span></p>

          <div class="member-part">
            <member-comp></member-comp>
          </div>

          <p class="part-sub-title"><span class="txt">优惠详情</span></p>

          <div class="discount-part">
            <discount-bar-comp></discount-bar-comp>
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

import userComp from "./components/user/index";
import activeUserComp from "./components/active-user";

import mapComp from "../first/components/map";

import welfareComp from "./components/welfare/index";

import discountBarComp from "./components/discount-bar";

import memberComp from "./components/member"
 
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
    headerComp,
    userComp,
    activeUserComp,
    mapComp,
    welfareComp,
    discountBarComp,
    memberComp,
    animationBorder
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
  overflow: hidden;
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
          width: 23%;
        }
        &.right {
          width: 23%;
        }
        .part-title {
          font-size: 18px;
          line-height:200%;
        }
        .part-sub-title {
            color:#00E1FF;
            text-align: center;
            font-size: 18px;
            // font-weight: 600;
            padding:15px;
            line-height: 100%;
            .txt {
              display: inline-block;
              border-bottom: 2px solid #00E1FF;
              padding:0 20px 6px;
            }
        }
      }
    }
  }
  .income-part {
    height: 62vh;
    .cum-dv-ring-chart {
      width: 100%;
      height: 100%;
    }
  }
  .order-part {
    margin-top: 2vh;
    flex: 1 0 auto;
    height:0;
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
  .discount-part {
    flex: 1 1 auto;
    height:0;
  }
}
</style>
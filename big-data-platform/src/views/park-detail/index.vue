<template>
  <div class="contain">
    <!-- <dv-full-screen-container class="bg"> -->
    <dv-loading v-if="loading">Loading...</dv-loading>
    <div v-else class="flex flex-dir-column host-body">
      <header-comp></header-comp>
      <main class="flex flex-1">

        <div class="branch-part left flex flex-dir-column trans-border">
          <p class="part-sub-title first">· 车场信息</p>

          <div class="detail-part">
            <detail-comp></detail-comp>
          </div>

          <div class="order-part">
              <div class="border-wrap">
                <p class="part-sub-title second">· 停车订单量</p>
                <div class="border-chart">
                  <order-comp></order-comp>
                </div>
              </div>
          </div>

        </div>

        <div class="branch-part center flex flex-dir-column">

          <div class="in-out-part trans-border">
              <div class="border-wrap">
                <animation-border>
                  <p class="part-title">车辆出/入场峰值</p>
                </animation-border>
                <div class="border-chart">
                  <in-out-comp></in-out-comp>
                </div>
              </div>
          </div>

          <div class="record-part trans-border">
              <div class="border-wrap">
                <animation-border>
                  <p class="part-title">停车记录</p>
                </animation-border>
                <div class="border-chart">
                  <record-comp></record-comp>
                </div>
              </div>
          </div>

        </div>

        <div class="branch-part right flex flex-dir-column">

          <div class="income-analyse-part trans-border">
              <div class="border-wrap">
                <animation-border>
                  <p class="part-title">收入分析</p>
                </animation-border>
                <div class="border-chart">
                  <income-analyse-comp></income-analyse-comp>
                </div>
              </div>
          </div>

          <div class="photo-part trans-border">
              <div class="border-wrap">
                <animation-border>
                  <p class="part-title">出入口实时信息</p>
                </animation-border>
                <div class="border-chart">
                  <photo-comp></photo-comp>
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

import detailComp from "./components/detail/index";
import orderComp from "./components/order";

import inOutComp from "./components/in-out-peak";

import recordComp from "./components/record";

import incomeAnalyseComp from "./components/income-analyse";

import photoComp from "./components/photo";

import animationBorder from "@/components/animationBoder/index";
// import { formatTime } from "@/utils/index.js";
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
    detailComp,
    orderComp,
    inOutComp,
    recordComp,
    incomeAnalyseComp,
    photoComp,
    animationBorder
  },
  mounted() {
    this.cancelLoading();
  },
  methods: {
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
  padding: 10px 35px 20px;
  overflow: hidden;
  .host-body {
    height: 100%;
    main {
      .branch-part {
        &.center {
          width: 34%;
          margin:0 1%;
        }
        &.left {
          width: 30%;
          border-top-left-radius: 50px 80px;
        }
        &.right {
          width: 34%;
        }
        .part-title {
          font-size: 18px;
          line-height: 200%;
        }
        .part-sub-title {
          padding:0 15px;
          color: #00F8FF;
          height:40px;
          font-size: 19px;
          font-weight: 600;
          line-height: 50px;
          .txt {
            display: inline-block;
            border-bottom: 3px solid #00e1ff;
          }
          &.first{
             background-image: url("../../assets/images/detail/sub-header-bg.png");
            background-size: 100% 100%;
          }
           &.second{
             background-image: url("../../assets/images/detail/sub-header-bg1.png");
              background-size: 100% 100%;
              .txt {
                position: relative;
                bottom:15px;
              }
            }
        }
      }
    }
    .trans-border {
      background-color: RGBA(26,71,240,.3);
      box-shadow: inset 0 0 10px RGBA(26,71,240,1);
      border-radius: 2%;
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
    margin-top: 30px;
    flex: 1 0 auto;
    height: 0;
  }

  .record-part {
    margin-top:2vh;
    flex: 1 0 auto;
    height: 0;
    padding:15px;
    overflow: hidden;
  }

  .income-analyse-part {
    height: 49vh;
  }

  .photo-part {
    margin-top: 2vh;
    flex: 1 1 auto;
    height: 0;
  }
}
</style>
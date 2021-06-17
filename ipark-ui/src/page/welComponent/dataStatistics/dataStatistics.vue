<template>
  <main>
    <div class="dataSum dataSum-left">
      <h4 class="tit">数据统计</h4>
      <div class="list">
        <div class="item">
          <div class="img">
            <img src="/img/wel/linshi.png" alt="" />
          </div>
          <div class="right">
            <h4>临时车辆（7日平均）</h4>
            <div class="number">
              <div class="num">{{ weekVehicleEntry.LVehicle }}</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="img">
            <img src="/img/wel/guding.png" alt="" />
          </div>
          <div class="right">
            <h4>特殊车辆（7日平均）</h4>
            <div class="number">
              <div class="num">{{ weekVehicleEntry.GVehicle }}</div>
            </div>
          </div>
        </div>

        <div class="item">
          <div class="img">
            <img src="/img/wel/wupai.png" alt="" />
          </div>
          <div class="right">
            <h4>访客车辆（7日平均）</h4>
            <div class="number">
              <div class="num">{{ weekVehicleEntry.KVehicle }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dataSum dataSum-right">
      <h4 class="tit">
        累计入场车辆：<span>{{ monthVehicleEntry.vehicleEntry }}</span>
      </h4>
      <div class="list">
        <div class="item">
          <div class="img">
            <img src="/img/wel/ruchang.png" alt="" />
            <i
              class="iconfont icon-jiantoushangsheng"
              v-if="
                monthVehicleEntry.Gfengzhi &&
                monthVehicleEntry.Gfengzhi.indexOf('-') == -1
              "
            ></i>
            <i class="iconfont icon-jiantouxiajiang active" v-else></i>
          </div>
          <div class="right">
            <div class="title">
              <h4>近30日总入场车辆</h4>
              <span>同比</span>
            </div>
            <div class="number">
              <div class="num">{{ monthVehicleEntry.monthVehicleCount }}</div>
              <div class="percent">{{ monthVehicleEntry.Gfengzhi }}</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="img">
            <img src="/img/wel/30linshi.png" alt="" />
            <i
              class="iconfont icon-jiantoushangsheng"
              v-if="
                monthVehicleEntry.Lfengzhi &&
                monthVehicleEntry.Lfengzhi.indexOf('-') == -1
              "
            ></i>
            <i class="iconfont icon-jiantouxiajiang active" v-else></i>
          </div>
          <div class="right">
            <div class="title">
              <h4>近30日总临时车辆</h4>
              <span>同比</span>
            </div>
            <div class="number">
              <div class="num">{{ monthVehicleEntry.monthVehicle }}</div>
              <div class="percent">{{ monthVehicleEntry.Lfengzhi }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { MonthVehicleEntry, WeekVehicleEntry } from "@/api/wel";
export default {
  name: "dataStatistics",
  data() {
    return {
      //饼图下方list列表7日数据
      monthVehicleEntry: {},
      //饼图下方list列表30日数据
      weekVehicleEntry: {},
    };
  },
  computed: {
    ...mapGetters(["parkInfo"]),
    parkId() {
      return this.parkInfo.id;
    },
  },
  watch: {
    parkId(newV, oldV) {
      if (newV) {
        this.MonthVehicleEntry();
        this.WeekVehicleEntry();
      }
    },
  },
  created() {
    if (this.parkId) {
      this.MonthVehicleEntry();
      this.WeekVehicleEntry();
    }
  },
  methods: {
    //饼图下方list列表30日数据
    MonthVehicleEntry() {
      MonthVehicleEntry({}).then((res) => {
        // console.log(res.data.data);
        this.monthVehicleEntry = res.data.data;
      });
    },
    //饼图下方list列表7日数据
    WeekVehicleEntry() {
      WeekVehicleEntry({}).then((res) => {
        // console.log(res.data.data);
        this.weekVehicleEntry = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  // height: 70vh;
  justify-content: space-between;
  margin-top: 15px;
}

.dataSum {
  padding: 0 20px;
  background: white;
  .tit {
    padding: 10px 0;
    margin: 0;
    span {
      color: #409eff;
    }
  }
  .list {
    display: flex;
    padding: 20px 0;
    // flex-wrap: wrap;
    .item {
      display: flex;
      width: 50%;
      .img {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-right: 10px;
        img {
          width: 28px;
          height: 28px;
          border: none;
        }
        i {
          color: red;
          font-size: 24px;
        }
        .active {
          color: #17a25f;
        }
      }
      .right {
        h4 {
          font-size: 16px;
          margin: 0;
        }
        .title {
          display: flex;
          justify-content: space-between;
          span {
            margin: 0 0 0 15px;
            font-size: 14px;
          }
        }

        .number {
          color: #409eff;
          font-size: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 20px;
          .percent {
            color: #333;
            font-size: 16px;
          }
        }
      }
    }
  }
}

.dataSum-left {
  width: 47.15%;
}
.dataSum-right {
  width: 47.15%;
}
</style>
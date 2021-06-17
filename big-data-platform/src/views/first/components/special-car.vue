<template>
  <dv-scroll-board :config="config" class="cum-scroll-board" :key="key" />
</template>

<script>
import { specialCar } from "@/api/first";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      config: {
        header: ["车辆类型", "数量", "日期"],
        data: [],
        headerBGC: "transparent",
        oddRowBGC: "transparent",
        evenRowBGC: "transparent",
        waitTime: 3000,
        align: ["center", "center", "center"],
      },
      key: 0,
    };
  },
  created() {
    window.addEventListener("resize", this.resize, false);
  },

  computed: {
    ...mapGetters(["cityId", "provinceId"]),
    citySet() {
      return { cityId: this.cityId, provinceId: this.provinceId };
    },
  },
  watch: {
    citySet(newV) {
      console.log(newV);
      if (newV) {
        this.getData();
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("reisze", this.resize);
  },
  mounted() {
    this.getData();
  },
  methods: {
    resize() {
      let time = new Date();
      this.$nextTick(() => {
        this.key = time.getTime();
        console.log(this.key);
      });
    },
    getData() {
      specialCar({
        provinceId: this.citySet.provinceId,
        cityId: this.citySet.cityId,
      }).then((res) => {
        if (res && res.data && res.data.length > 0) {
          this.config.data = res.data.map((v) => {
            return [v.name, v.cityCount, v.time];
          });
          this.resize();
        } else {
          this.config.data = [];
        }
      });
    },
  },
};
</script>

<style lang='scss'>
.dv-scroll-board.cum-scroll-board {
  .header {
    background-color: RGBA(26, 71, 240, 0.3);
    box-shadow: inset 0 0 10px RGBA(26, 71, 240, 1);
    .header-item {
      font-size: 13px;
      font-weight: 600;
      color: #00f9ff;
      height: 30px !important;
      line-height: 30px !important;
      text-align: center;
    }
  }
  .row-item {
    border-bottom: 1px solid rgba(0, 249, 255, 0.2);
  }
  .rows {
    .ceil {
      padding: 0 2px;
      font-size: 12px;
      text-align: center;
      &:nth-last-child(1) {
        color: #00f9ff;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.cum-scroll-board {
  height: 85%;
  margin-top: 10px;
  .header {
  }
}
</style>
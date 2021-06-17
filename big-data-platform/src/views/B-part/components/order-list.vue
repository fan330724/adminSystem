<template>
  <dv-scroll-board
    :config="config"
    :align="['center', 'center', 'center', 'center']"
    class="cum-scroll-board"
    :key="key"
  />
</template>

<script>
import { currentTimeOrder } from "@/api/b-part";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      config: {
        header: ["日期", "车牌号", "时长", "支付方式"],
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
    ...mapGetters(["bcityId"]),
    bcityid() {
      return this.bcityId;
    },
  },
  watch: {
    bcityid(newV) {
      if (newV) {
        this.getList();
      }
    },
  },
  mounted() {
    this.getList();
  },
  beforeDestroy() {
    window.removeEventListener("reisze", this.resize);
  },
  methods: {
    resize() {
      let time = new Date();
      this.$nextTick(() => {
        this.key = time.getTime();
        console.log(this.key);
      });
    },
    /**
     * 获取实时订单列表
     */
    getList() {
      let params = {
        regionCode: this.bcityid,
      };
      currentTimeOrder(params).then((res) => {
        if (res && res.data && res.data.length > 0) {
          this.config.data = res.data.map((i) => {
            let time = i.payTime.slice(0, 10);
            let plate = i.plate_number.substr(0,2)+'***'+i.plate_number.substr(5,i.plate_number.split('').length)
            return [time, plate, i.hour, i.paymethod];
          });
          this.resize();
          console.log(this.config.data);
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
  height: 100%;
  .header {
  }
}
</style>
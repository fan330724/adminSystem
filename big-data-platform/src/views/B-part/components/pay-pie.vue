<template>
  <div>
    <Chart :cdata="cdata" height="24vh"/>
  </div>
</template>

<script>
import Chart from "@/components/echart/pie/pay-pie.vue";
import { getIncome } from "@/api/b-part";
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      cdata: {
        title:'',
        subTitle:'',
        seriesData: []
      }
    }
  },
  components: {
    Chart,
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
        this.getIncome();
      }
    },
  },
  mounted() {
    this.getIncome();
  },
  methods: {
    /**
     * 获取收入统计数据
     */
    getIncome() {
      let params = {
        regionCode: this.bcityid || "140100",
      };
      getIncome(params).then((res) => {
        if (res && res.data) {
          let list = [];
          for (let key in res.data) {
            let temp = {};
            temp.name = this.formatType(key);
            temp.value = Number(res.data[key]);
            if (key !== "count") {
              list.push(temp);
            }
          }
          let temp = {
            seriesData: list,
            title: `${res.data.count}元`,
            subTitle: '总收入'
          };
          this.cdata = temp;
        }
      });
    },
    formatType(key) {
      let result = "";
      if (key === "alipayCount") {
        result = "支付宝";
      } else if (key === "count") {
        result = "总数";
      } else if (key === "qitaCount") {
        result = "其他";
      } else if (key === "wxpayCount") {
        result = "微信";
      } else if (key === "xjpayCount") {
        result = "现金";
      } else {
        result = "";
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
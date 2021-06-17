<template>
  <Chart :cdata="cdata" style="height: 100%" />
</template>

<script>
import Chart from "@/components/echart/bar/rank.vue";
import { parkingRanking } from "@/api/b-part";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cdata: {
        nameList: [],
        valueList: [],
      },
    };
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
        this.getData();
      }
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    /**
     * 获取排名数据
     */
    getData() {
      let params = {
        regionCode: this.bcityid,
      };
      parkingRanking(params).then((res) => {
        if (res && res.data) {
          let temp = {
            nameList: [],
            valueList: [],
          };
          res.data.forEach((i) => {
            // temp.nameList.push(i.PARK_NAME.substr(0, 4));
            temp.nameList.push(i.PARK_NAME);
            temp.valueList.push(Number(i.PARK_ID));
          });
          this.cdata = temp;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
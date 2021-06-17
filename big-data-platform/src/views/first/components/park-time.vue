<template>
  <div>
    <Chart :cdata="cdata" height="25vh" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from "@/components/echart/parkTime/index";
import { parkingHours } from "@/api/first";
export default {
  data() {
    return {
      cdata: {
        xData: [],
        closed: [],
        roadside: [],
        closedCharge: [],
        roadsideCharge: [],
      },
    };
  },
  components: {
    Chart,
  },
  computed: {
    ...mapGetters(["cityId", "provinceId"]),
    cityid() {
      return { cityId: this.cityId, provinceId: this.provinceId };
    },
  },
  watch: {
    cityid(newV) {
      if (newV) {
        this.getData();
      }
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      parkingHours({
        provinceId: this.cityid.provinceId,
        cityId: this.cityid.cityId,
      }).then((res) => {
        console.log(res.data);
        this.cdata.xData = res.data.map((v) => {
          return v.REGION_NAME;
        });
        this.cdata.closed = res.data.map((v) => {
          return v.closed;
        });
        this.cdata.roadside = res.data.map((v) => {
          return v.roadside;
        });
        this.cdata.closedCharge = res.data.map((v) => {
          return v.closedCharge;
        });
        this.cdata.roadsideCharge = res.data.map((v) => {
          return v.roadsideCharge;
        });
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.list {
  flex: 1 1 auto;
}
.item {
  margin-right: 3%;
  .title {
    font-size: 12px;
    font-weight: 600;
  }
  .time-part {
    margin-top: 15px;
    font-weight: 600;
    .time {
      font-size: 18px;
    }
    .sign {
      font-size: 11px;
      color: #00aaf5;
    }
  }
  &:nth-of-type(1) {
    .time {
      color: #cf443d;
    }
  }
  &:nth-of-type(2) {
    .time {
      color: #ffa400;
    }
  }
  &:nth-of-type(3) {
    margin-right: 0;
    .time {
      color: #00d9e6;
    }
  }
}
</style>
<template>
  <main>
    <div class="part pie-left">
      <div class="pie">
        <div class="tabs">
          <el-tabs
            type="border-card"
            @tab-click="handleClick"
            v-model="carClass"
          >
            <el-tab-pane label="今日入场车辆分类" name="0" lazy="true">
              <div class="echart" style="min-height: 230px">
                <echart-comp
                  class="echartHeight"
                  :extraOption="typeOption"
                  v-if="'0' === carClass"
                ></echart-comp>
              </div>
            </el-tab-pane>
            <el-tab-pane label="昨日入场车辆分类" name="1" lazy="true">
              <div class="echart" style="min-height: 230px">
                <echart-comp
                  class="echartHeight"
                  :extraOption="typeOption"
                  v-if="'1' === carClass"
                ></echart-comp>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="part pie-right">
      <div class="pie">
        <div class="tabs">
          <el-tabs
            type="border-card"
            @tab-click="handleClick"
            v-model="carBrand"
          >
            <el-tab-pane label="今日入场车辆品牌" name="0" lazy="true">
              <div class="echart" style="min-height: 230px">
                <echart-comp
                  class="echartHeight"
                  :extraOption="brandOption"
                  v-if="'0' === carBrand"
                ></echart-comp>
              </div>
            </el-tab-pane>
            <el-tab-pane label="昨日入场车辆品牌" name="1" lazy="true">
              <div class="echart" style="min-height: 230px">
                <echart-comp
                  class="echartHeight"
                  :extraOption="brandOption"
                  v-if="'1' === carBrand"
                ></echart-comp>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import echartComp from "@/components/echart/index";
import { VehicleClassify, VehicleBrand } from "@/api/wel";
var colorList = [
  {
    type: "linear",
    x: 0,
    y: 0,
    x2: 1,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: "rgba(51,192,205,0.2)", // 0% 处的颜色
      },
      {
        offset: 1,
        color: "rgba(51,192,205,0.8)", // 100% 处的颜色
      },
    ],
    globalCoord: false, // 缺省为 false
  },
  {
    type: "linear",
    x: 1,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: "rgba(115,172,255,0.2)", // 0% 处的颜色
      },
      {
        offset: 1,
        color: "rgba(115,172,255,0.8)", // 100% 处的颜色
      },
    ],
    globalCoord: false, // 缺省为 false
  },
  {
    type: "linear",
    x: 1,
    y: 0,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: "rgba(158,135,255,0.2)", // 0% 处的颜色
      },
      {
        offset: 1,
        color: "rgba(158,135,255,0.8)", // 100% 处的颜色
      },
    ],
    globalCoord: false, // 缺省为 false
  },
  {
    type: "linear",
    x: 0,
    y: 1,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: "rgba(252,75,75,0.4)", // 0% 处的颜色
      },
      {
        offset: 1,
        color: "rgba(252,75,75,0.8)", // 100% 处的颜色
      },
    ],
    globalCoord: false, // 缺省为 false
  },
  {
    type: "linear",
    x: 1,
    y: 1,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: "rgba(253,138,106,0.2)", // 0% 处的颜色
      },
      {
        offset: 1,
        color: "#f7db88", // 100% 处的颜色
      },
    ],
    globalCoord: false, // 缺省为 false
  },
  {
    type: "linear",
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: "rgba(254,206,67,0.2)", // 0% 处的颜色
      },
      {
        offset: 1,
        color: "#FFCD42", // 100% 处的颜色
      },
    ],
    globalCoord: false, // 缺省为 false
  },
];
var colorLine = [
  "#33C0CD",
  "#73ACFF",
  "#9E87FF",
  "#FE6969",
  "#FDB36A",
  "#ffb800",
];

function getRich() {
  let result = {};
  colorLine.forEach((v, i) => {
    result[`hr${i}`] = {
      backgroundColor: colorLine[i],
      borderRadius: 3,
      width: 3,
      height: 3,
      padding: [3, 3, 0, -12],
    };
    result[`a${i}`] = {
      padding: [8, -60, -20, -20],
      color: colorLine[i],
      fontSize: 14,
      fontWeight: 600,
    };
  });
  return result;
}
let option = {
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c}辆 ({d}%)",
  },
  series: [
    {
      type: "pie",
      radius: ["3%", "80%"],
      center: ["50%", "50%"],
      clockwise: true,
      avoidLabelOverlap: true,
      label: {
        show: true,
        position: "outside",
        formatter: function (params) {
          const name = params.name;
          const percent = params.percent + "%";
          const index = params.dataIndex;
          return [`{a${index}|${name}：${percent}}`, `{hr${index}|}`].join(
            "\n"
          );
        },
        rich: getRich(),
      },
      itemStyle: {
        normal: {
          color: function (params) {
            return colorList[params.dataIndex];
          },
        },
      },
      data: [],
      // roseType: "radius",
    },
  ],
};
export default {
  name: "pieComp",
  components: {
    echartComp,
  },
  data() {
    return {
      //饼图切换索引
      carClass: "0",
      carBrand: "0",
      //定时器
      time: "",
      //图表数据
      typeData: [],
      brandData: [],
    };
  },
  computed: {
    ...mapGetters(["parkInfo"]),
    parkId() {
      return this.parkInfo.id;
    },
    typeOption() {
      let result = JSON.parse(JSON.stringify(option));
      result.series[0].data = this.typeData;
      return result;
    },
    brandOption() {
      let result = JSON.parse(JSON.stringify(option));
      result.series[0].data = this.brandData;
      return result;
    },
  },
  watch: {
    parkId(newV, oldV) {
      if (newV) {
        this.VehicleClassify(0);
        this.VehicleBrand(0);
      }
    },
  },
  created() {
    if (this.parkId) {
      this.VehicleClassify(0);
      this.VehicleBrand(0);
    }
  },
  mounted() {
    this.time = setInterval(() => {
      this.VehicleClassify(this.carClass);
      this.VehicleBrand(this.carBrand);
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  methods: {
    /**
     * 格式化饼状图数据
     */
    formatPieData(data) {
      let temp = data.sort((a, b) => {
        return b.value - a.value;
      });
      temp.forEach((v, i) => {
        v.labelLine = {
          lineStyle: {
            width: 1,
            color: colorLine[i],
          },
        };
      });
      return temp;
    },
    //饼图数据
    VehicleClassify(index) {
      VehicleClassify({}).then((res) => {
        if (res.data && res.data.data) {
          let sign = "tVehicle";
          if (index == 1) {
            sign = "yVehicle";
          }
          let result = res.data.data[sign].filter((i) => {
            return i.value !== 0;
          });
          this.typeData = this.formatPieData(result);
        }
      });
    },
    //车辆品牌饼图数据
    VehicleBrand(index) {
      VehicleBrand({}).then((res) => {
        if (res.data && res.data.data) {
          let sign = "tBrand";
          if (index == 1) {
            sign = "yBrand";
          }
          let result = res.data.data[sign].filter((i) => {
            return i.value !== 0;
          });
          this.brandData = this.formatPieData(result);
        }
      });
    },
    // 点击切换
    handleClick(index) {
      let lab = index.label;
      if (lab.indexOf("分类") != -1) {
        this.typeData = [];
        this.VehicleClassify(this.carClass);
      } else if (lab.indexOf("品牌") != -1) {
        this.brandData = [];
        this.VehicleBrand(this.carBrand);
      }
    },
  },
};
</script>
<style lang="scss">
.el-tabs--border-card {
  box-shadow: none !important;
  border: none;
  .el-tabs__header {
    border: none !important;
    .el-tabs__item {
      border: none !important;
    }
  }
}
</style>
<style lang="scss" scoped>
main {
  display: flex;
  // height: 70vh;
  justify-content: space-between;
  margin-top: 15px;
}
.part {
  background: white;
  display: flex;
  flex-direction: column;
}
.echart {
  height: 250px;
  .echartHeight {
    height: 100%;
  }
}

.pie-left {
  width: 49.6%;
}

.pie-right {
  width: 49.6%;
}
</style>
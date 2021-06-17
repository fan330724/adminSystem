<template>
  <main class="main">
    <div class="flex">
      <div class="part home-page-left" style="min-width: 180px">
        <a
          class="camera-a"
          href="iparkOpenExe://C:/iparkService/bin/HorseMonitor.exe"
          >打开实时摄像头</a
        >
        <el-button class="margin" @click="showOutBtn" type="primary">
          一键放行
        </el-button>
        <div class="clear"></div>
        <div class="title">
          <div class="txt">停车场实时数据</div>
          <span>(每60秒更新)</span>
        </div>
        <div class="page-left-item">
          <p class="label">停车位使用</p>
          <div class="number">
            <div class="num">{{ parkRealTimeData.empty_space }}</div>
            <i>/</i>
            <div class="sum">{{ parkRealTimeData.space }}</div>
          </div>
        </div>
        <div class="page-left-item">
          <p class="label">临时车辆</p>
          <div class="number">
            <div class="num">{{ parkRealTimeData.linshiche }}</div>
          </div>
        </div>
        <div class="page-left-item">
          <p class="label">特殊车辆</p>
          <div class="number">
            <div class="num">{{ parkRealTimeData.gudingche }}</div>
          </div>
        </div>
      </div>
      <div class="part home-page-right">
        <div class="tabs">
          <div
            v-for="(item, index) in rightNavigation"
            :class="[{ active: active == index }, 'tabs-item']"
            @click="table(index)"
            :key="index"
          >
            <div>
              <h4>{{ item.name }}</h4>
              <div class="left-bottom">
                <div class="number">
                  <div class="num">{{ item.today }}</div>
                </div>

                <div class="footer">
                  <span>{{ item.Yesterday }}</span>
                  <i
                    class="iconfont icon-jiantoushangsheng"
                    v-if="item.Yesterday && item.Yesterday.indexOf('-') == -1"
                  ></i>
                  <i class="iconfont icon-jiantouxiajiang active" v-else></i>
                </div>
              </div>
            </div>

            <div class="right-img-part">
              <i
                class="right-img"
                :class="{
                  'el-icon-s-fold': index === 0,
                  'el-icon-s-unfold': index === 1,
                  'el-icon-s-claim': index === 2,
                }"
              ></i>
            </div>
          </div>
        </div>
        <div class="tabContent">
          <echart-comp
            class="echart"
            :extraOption="lineOption"
            style="min-height: 230px"
          ></echart-comp>
        </div>
      </div>
    </div>

    <el-dialog
      title="一键放行"
      :visible.sync="showOut"
      width="30%"
      :before-close="handleClose"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="出入口" prop="radio">
          <el-radio-group v-model="form.radio" @change="editRadio">
            <el-radio label="1" border>入口</el-radio>
            <el-radio label="2" border>出口</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择岗亭" prop="sentry" class="marginTop">
          <el-select
            v-model="form.sentry"
            placeholder="请选择岗亭"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="reason" v-if="this.form.radio != '1'">
          <el-select
            v-model="form.reason"
            placeholder="请选择原因"
            style="width: 100%"
          >
            <el-option label="领导放行" value="领导放行"></el-option>
            <el-option label="现金收费" value="现金收费"></el-option>
            <el-option label="设备维修工" value="设备维修工"></el-option>
            <!-- <el-option label="病患车辆" value="病患车辆"></el-option> -->
            <el-option label="来访车辆" value="来访车辆"></el-option>
            <el-option label="内部车辆" value="内部车辆"></el-option>
            <el-option label="其它" value="其它"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="reasonInput"
          label="手动输入"
          v-if="form.reason === '其它'"
        >
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            v-model="form.reasonInput"
            placeholder="请输入备注"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="beforeSave">确 定</el-button>
      </span>
    </el-dialog>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import {
  ParkRealTimeData,
  RightNavigation,
  DataStatistics,
  thepassage,
} from "@/api/wel";
import { getToList } from "@/api/pay/iparkparkingorder";
import echartComp from "@/components/echart/index";
import echarts from "echarts";
export default {
  name: "top",
  components: {
    echartComp,
  },
  data() {
    return {
      //停车场实时数据
      parkRealTimeData: {},
      // //今日进场出场数据
      rightNavigation: [],
      //tab切换索引
      active: 0,
      //定时器
      time: "",
      showOut: false,
      form: {
        radio: "2",
        reason: "领导放行",
        sentry: "",
      },
      options: [],
      //图表数据
      lineOption: {
        backgroundColor: "#fff",
        title: {
          text: "",
          left: "9%",
          top: "3%",
          textStyle: {
            color: "#999",
            fontSize: 18,
          },
        },
        grid: {
          left: "2%",
          right: "5%",
          bottom: "3%",
          containLabel: true,
        },
        legend: {
          show: true,
          icon: "circle",
          top: "3%",
          right: "5%",
          itemWidth: 9,
          itemHeight: 9,
          itemGap: 25,
          selectedMode: "single",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: [
          {
            name: "时",
            type: "category",
            data: [],
            axisLine: {
              lineStyle: {
                color: "#ccc",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#c56790",
              },
              margin: 15,
            },
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            name: "停车数/辆",
            type: "value",
            minInterval: 1,
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#ccc",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#c56790",
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            data: [],
            symbolSize: 6,
            symbol: "circle",
            smooth: true,
            showSymbol: false,
            lineStyle: {
              color: "#fe9a8b",
            },
            itemStyle: {
              normal: {
                color: "#fe9a8b",
                borderColor: "#fe9a8b",
              },
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#fe9a8bb3",
                },
                {
                  offset: 1,
                  color: "#fe9a8b03",
                },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#fe9a8b",
                    },
                    {
                      offset: 0.4,
                      color: "#fe9a8b",
                    },
                    {
                      offset: 0.5,
                      color: "#fff",
                    },
                    {
                      offset: 0.7,
                      color: "#fff",
                    },
                    {
                      offset: 0.8,
                      color: "#fff",
                    },
                    {
                      offset: 1,
                      color: "#fff",
                    },
                  ],
                },
                borderColor: "#fe9a8b",
                borderWidth: 2,
              },
            },
          },
          {
            name: "",
            type: "line",
            data: [],
            symbolSize: 6,
            symbol: "circle",
            smooth: true,
            showSymbol: false,
            lineStyle: {
              color: "#9E87FF",
            },
            itemStyle: {
              normal: {
                color: "#9E87FF",
                borderColor: "#9E87FF",
              },
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#9E87FFb3",
                },
                {
                  offset: 1,
                  color: "#9E87FF03",
                },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#9E87FF",
                    },
                    {
                      offset: 0.4,
                      color: "#9E87FF",
                    },
                    {
                      offset: 0.5,
                      color: "#fff",
                    },
                    {
                      offset: 0.7,
                      color: "#fff",
                    },
                    {
                      offset: 0.8,
                      color: "#fff",
                    },
                    {
                      offset: 1,
                      color: "#fff",
                    },
                  ],
                },
                borderColor: "#9E87FF",
                borderWidth: 2,
              },
            },
          },
        ],
      },
      rules: {
        radio: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        reason: [{ required: true, message: "请选择备注", trigger: "change" }],
        sentry: [{ required: true, message: "请选择岗亭", trigger: "change" }],
        reasonInput: [
          { required: true, message: "请输入备注", trigger: "blur" },
        ],
      },
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
        this.getParkRealTimeData();
        this.RightNavigation();
        this.DataStatistics(this.active);
      } else {
        return;
      }
    },
  },
  created() {
    if (this.parkId) {
      this.getParkRealTimeData();
      this.RightNavigation();
      this.DataStatistics(this.active);
      // getToList(this.parkId, "gate").then((res) => {
      //   this.options = res.data.data;
      //   this.form.sentry = res.data.data[0].id;
      // });
    }
  },
  mounted() {
    if (this.parkId) {
      this.time = setInterval(() => {
        this.getParkRealTimeData();
        this.RightNavigation();
        this.DataStatistics(this.active);
      }, 60000);
    }
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  methods: {
    //停车场实时数据
    getParkRealTimeData() {
      ParkRealTimeData({}).then((res) => {
        // console.log(res.data.data);
        this.parkRealTimeData = res.data.data;
      });
    },
    //今日进场出场数据
    RightNavigation() {
      RightNavigation({}).then((res) => {
        // console.log(res.data.data.array);
        this.rightNavigation = res.data.data.array;
      });
    },
    //今日进场出场折线图数据
    DataStatistics(index) {
      DataStatistics({}).then((res) => {
        // //x轴的数据
        const x = res.data.data.x;
        //今日进场数据
        const int = res.data.data.in;
        //今日出场数据
        const out = res.data.data.out;
        //今日收费数据
        const money = res.data.data.money;
        this.lineOption.xAxis[0].data = x;
        switch (index) {
          case 0:
            this.keyArray(int, this.lineOption, "入场车辆统计", "停车数/辆");
            break;
          case 1:
            this.keyArray(out, this.lineOption, "出场车辆统计", "停车数/辆");
            break;
          case 2:
            this.keyArray(money, this.lineOption, "停车收费统计", "费用/元");
            break;
        }
      });
    },
    keyArray(list, option, title, yName) {
      //第一步取出series中的name部分——键名
      let keyArray = Object.keys(list[0]);
      //第二步，循环添加数据
      keyArray.forEach((key, index) => {
        option.series[index].name = key;
        option.series[index].data = list.map((i) => {
          return i[key];
        });
        option.title.text = title;
        option.yAxis[0].name = yName;
      });
    },
    /**
     * 点击切换数据
     */
    table(index) {
      this.active = index;
      this.DataStatistics(this.active);
    },

    /**
     * 一键抬杠
     */
    showOutBtn() {
      this.showOut = true;
      if (this.parkId) {
        getToList(this.parkId, "gate").then((res) => {
          this.options = res.data.data;
          this.form.sentry = res.data.data[0].id;
        });
      }
    },
    handleClose() {
      this.showOut = false;
      this.form = {
        radio: "2",
        reason: "领导放行",
      };
      this.$refs["form"].resetFields();
    },
    editRadio(e) {
      if (e == 1) {
        this.form.reason = "";
      } else {
        this.form.reason = "领导放行";
      }
    },
    beforeSave() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let { radio, reason, sentry, reasonInput} = this.form;
          let reasons = "";
          if (reason == "其它" && reasonInput) {
            reasons = reasonInput;
          } else {
            reasons = reason;
          }
          let params = {
            PARK_ID: this.parkId,
            REASON: reasons,
            TYPE: radio,
            GATE_ID: sentry,
          };
          thepassage(params).then((res) => {
            if (res.data.errcode == 0) {
              this.handleClose();
              if (radio == 1) {
                this.$message({
                  type: "success",
                  message: "入场成功",
                });
              } else {
                this.$message({
                  type: "success",
                  message: "出场成功",
                });
              }
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg,
              });
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style  lang="scss" scoped>
@import "@/styles/icon.scss";
.flex {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}
.part {
  background: white;
}
.home-page-left {
  width: 18%;
  padding: 25px 20px 10px;
  border-radius: 4px;
  .camera-a {
    color: #22a7f2;
    font-size: 14px;
    text-decoration: underline;
  }
  .margin {
    float: right;
    margin-right: 15px;
  }
  .clear{
     clear: both;
  }
  .title {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .txt {
      font-size: 20px;
      font-weight: 600;
      margin-right: 10px;
    }
    span {
      font-size: 12px;
    }
  }
  .page-left-item {
    position: relative;
    padding: 20px 10px;
    .label {
      font-size: 16px;
      margin: 0;
    }
    .number {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .num {
        color: #409eff;
        font-size: 31px;
        font-weight: 600;
      }
      i {
        font-style: normal;
        margin: 0 5px;
      }
      .sum {
        color: #333;
        font-size: 31px;
        font-weight: 600;
      }
    }
    &:after {
      position: absolute;
      content: "";
      bottom: 0;
      width: 70%;
      height: 2px;
      background-color: #30c77e;
    }
  }
}

.home-page-right {
  width: 81%;
  background-color: #ffffff;
  padding: 1.302083vw 1.041667vw 0.520833vw;
  .tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 10px;
    .tabs-item {
      cursor: pointer;
      // border: 1px solid #ccc;
      box-shadow: 0 12px 33px 0 rgba(62, 73, 84, 0.08);
      background-color: #fff;
      border-radius: 13px;
      padding: 20px 40px;
      width: 25%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 1;
      border-color: transparent;
      color: #fff;
      height: 110px;
      &:nth-of-type(1) {
        background-color: #2bc155;
      }
      &:nth-of-type(2) {
        background-color: #369dc9;
      }
      &:nth-of-type(3) {
        background-color: #a336c9;
      }
      &:after {
        position: absolute;
        z-index: -1;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        border-radius: 13px;
        content: "";
        background: -moz-linear-gradient(
          left,
          rgba(255, 255, 255, 0.35) 0,
          rgba(125, 185, 232, 0) 100%
        );
        background: -webkit-linear-gradient(
          left,
          rgba(255, 255, 255, 0.35) 0,
          rgba(125, 185, 232, 0) 100%
        );
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0.35) 0,
          rgba(125, 185, 232, 0) 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#59ffffff',endColorstr='#007db9e8',GradientType=1);
      }
      h4 {
        font-size: 15px;
        font-weight: 500;
        margin: 0;
      }
      .left-bottom {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 5px;
      }
      .number {
        font-size: 45px;
        font-weight: 600;
      }
      .footer {
        display: flex;
        align-items: center;
        margin-left: 15px;
        i {
          font-size: 25px;
          margin-left: 5px;
        }
        .active {
        }
      }
      .right-img-part {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #fff;
        .right-img {
          font-size: 30px;
        }
      }
    }
    // .active {
    //   box-shadow:0 4px 8px rgba(0, 0, 0, .5);
    // }
    // .active .number .num {
    //   color: #409eff;
    // }
  }
  .tabContent {
    padding: 10px;
  }
  .echart {
    height: 330px !important;
  }
}
</style>
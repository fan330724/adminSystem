<template>
  <main>
    <div class="block">
      <el-date-picker
        v-model="dateRange"
        class="block-date"
        type="daterange"
        range-separator="~"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="dateChange"
      >
      </el-date-picker>
      <el-button
        type="primary"
        icon="el-icon-search"
        style="margin-left: 30px"
        size="mini"
        @click="search"
        >搜索</el-button
      >
    </div>
    <div class="tabs">
      <el-tabs
        type="border-card"
        @tab-click="handleClick"
        v-model="filParam.type"
      >
        <el-tab-pane
          v-for="item in itemTab"
          :label="item.name"
          :name="item.id"
          :key="item.id"
          lazy="true"
        >
          <echart-comp
            class="echart"
            :extraOption="lineOption"
            v-if="item.id === filParam.type"
            style="min-height: 230px;"
          ></echart-comp>
        </el-tab-pane>
      </el-tabs>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import echartComp from "@/components/echart/index";
import echarts from "echarts";
import { monthLineCharty, getTab } from "@/api/wel";
export default {
  name: "dateEchart",
  components: {
    echartComp,
  },
  data() {
    let _minTime = null;
    let _maxTime = null;
    let nowDate = new Date();
    let timeRange = 30 * 24 * 60 * 60 * 1000; // 30天
    return {
      dateRange: [],
      filParam: {
        inTime: "",
        outTime: "",
        type: "",
      },
      //tab数据
      itemTab: [],
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
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        legend: {
          show: false,
          icon: "circle",
          top: "3%",
          right: "5%",
          itemWidth: 9,
          itemHeight: 9,
          itemGap: 25,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: [
          {
            name: "日期",
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
              rotate: 45,
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
        ],
      },
      pickerOptions: {
        onPick: (time) => {
          // 如果选择了只选择了一个时间
          if (!time.maxDate) {
            _minTime = time.minDate.getTime() - timeRange; // 最小时间
            _maxTime = time.minDate.getTime() + timeRange; // 最大时间 // 如果选了两个时间，那就清空本次范围判断数据，以备重选
            if (_maxTime >= nowDate.getTime()) {
              // console.log("大于");
              if (time.minDate.getTime() < nowDate.getTime()) {
                // console.log("小于当前值")
                _maxTime =
                  time.minDate.getTime() +
                  (nowDate.getTime() - time.minDate.getTime());
              } else {
                // console.log("大于当前值")
                _maxTime = time.minDate.getTime();
              }
            } else {
              // console.log("小于");
              _maxTime = time.minDate.getTime() + timeRange;
            }
          } else {
            _minTime = _maxTime = null;
          }
        },
        disabledDate(time) {
          // onPick后触发
          // 返回false表示该日期禁选
          if (_minTime && _maxTime) {
            return time.getTime() < _minTime || time.getTime() > _maxTime;
          } else {
            return time.getTime() > nowDate.getTime();
          }
        },
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
        this.setDefaiultTime();
        this.getTab();
      }
    },
  },
  created() {
    if (this.parkId) {
      this.setDefaiultTime();
      this.getTab();
    }
  },
  methods: {
    //获取tab列表
    getTab() {
      getTab(this.parkInfo.id).then((res) => {
        console.log(res.data.data);
        this.itemTab = res.data.data;
        this.filParam.type = res.data.data[0].id;
        this.monthLineCharty();
      });
    },
    //下方折线图数据
    monthLineCharty() {
      let temp = Object.assign({}, this.filParam);
      this.lineOption.series[0].data = []
      monthLineCharty(temp).then((res) => {
        console.log(res);
        if (res.data.data) {
          this.$nextTick(() => {
            this.lineOption.xAxis[0].data = res.data.data.x;
            this.keyArray(res.data.data.in, this.lineOption, "", "停车数/辆");
          });
        }
      });
    },
    /**
     * 设置默认时间
     */
    setDefaiultTime() {
      let timeRange = 30 * 24 * 60 * 60 * 1000; // 30天
      let outTime = this.timestampToTime(Date.now());
      let inTime = this.timestampToTime(Date.now() - timeRange);

      this.filParam.inTime = inTime;
      this.filParam.outTime = outTime;
      this.dateRange = [this.filParam.inTime, this.filParam.outTime];
    },
    //获取时间
    dateChange(val) {
      if (val && val.length === 2 && val[0] && val[1]) {
        this.filParam.inTime = val[0];
        this.filParam.outTime = val[1];
      } else {
        this.monthLineCharty();
      }
    },
    /**
     * 根据指定日期查询
     */
    search() {
      this.monthLineCharty();
    },

    //转换毫秒为年月日
    timestampToTime(cjsj) {
      var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      return Y + M + D;
    },
    //点击切换
    handleClick(index) {
      let id = index.name;
      this.filParam.type = id;
      this.monthLineCharty();
    },
    keyArray(list, option, title, yName) {
      //第一步取出series中的name部分——键名
      let keyArray = Object.keys(list[0]);
      //第二步，循环添加数据
      keyArray.forEach((key, index) => {
        option.series[index].name = key;
        option.series[index].data = list.map((i) => i[key]);
        option.title.text = title;
        option.yAxis[0].name = yName;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  background: white;
  margin-top: 15px;
}
.block {
  padding: 10px;
}
.echart {
  height: 350px !important;
}
</style>
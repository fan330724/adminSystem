<template>
  <div
    :id="id"
    class="map-warp"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import tdTheme from "@/common/echart/theme.json"; // 引入默认主题
import resizeMixins from "@/utils/resizeMixins";
import autiChoiceMixins from "@/utils/echart/auto-choice";
import autoWidthMixins from "@/utils/echart/auto-width-mixins";
import axios from "axios";
const cityMap = {
  小店区: "140105",
  迎泽区: "140106",
  杏花岭区: "140107",
  尖草坪区: "140108",
  万柏林区: "140109",
  晋源区: "140110",
  清徐县: "140121",
  阳曲县: "140122",
  娄烦县: "140123",
  古交市: "140181",
};
export default {
  name: "echart",
  mixins: [resizeMixins, autiChoiceMixins,autoWidthMixins],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "cityMap",
    },
    cdata: {
      type: Object,
      default: {
        citys: [],
      },
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "60vh",
    },
    auto: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chart: null,
      data: [],
      mapdata: [
        {
          name: "阳曲县",
          value: 119,
        },
        {
          name: "娄烦县",
          value: 8,
        },
        {
          name: "古交市",
          value: 7,
        },
        {
          name: "尖草坪区",
          value: 6,
        },
        {
          name: "万柏林区",
          value: 5,
        },
        {
          name: "杏花岭区",
          value: 125,
        },
        {
          name: "迎泽区",
          value: 4,
        },
        {
          name: "晋源区",
          value: 3,
        },
        {
          name: "小店区",
          value: 2,
        },
        {
          name: "清徐县",
          value: 113,
        },
      ],
      options: {
        showLegendSymbol: true,
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: 13,
            lineHeight: 22,
          },
          position: (point) => {
            // 固定在顶部
            return [point[0] + 50, point[1] - 20];
          },
          // 如果需要自定义 tooltip样式，需要使用formatter
          /*
              formatter: params => {
                return `<div style=""> ... </div>`
              }
            */
        },
        visualMap: {
          min: 0,
          max: 150,
          show: false,
          type: "piecewise",
          seriesIndex: 0,
          // 颜色
          inRange: {
            color: ["#11CFEF", "#1D79FD"],
          },
        },
        grid: {
          top: "5%",
          left: "5%",
        },
        // 底部背景
        series: [],
      },
      // allData: {
      //   citys: [
      //     {
      //       name: "阳曲西站",
      //       value: [112.654262, 38.077842, 4],
      //       symbolSize: 8,
      //       itemStyle: { normal: { color: "#FF7DA1" } },
      //     },
      //     {
      //       name: "清徐站",
      //       value: [112.317927, 37.564307, 8],
      //       symbolSize: 8,
      //       itemStyle: { normal: { color: "#FF7DA1" } },
      //     },
      //   ],
      //   moveLines: [
      //     {
      //       fromName: "阳曲西站",
      //       toName: "清徐站",
      //       coords: [
      //         [112.654262, 38.077842],
      //         [112.317927, 37.564307],
      //       ],
      //     },
      //   ],
      // },
    };
  },
  watch: {
    cdata: {
      handler(newData) {
        // 设置true清空echart缓存
        if (newData.citys && newData.citys.length > 0) {
          this.renderMap("太原市", newData);
        }
        // if (this.auto) {
        //   this.seriesDataLen = options.series[0].data.length;
        //   this.handleMapRandomSelect(this.chart); //autiChoiceMixins自动高亮显示
        // }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.$echarts.registerTheme("tdTheme", tdTheme); // 覆盖默认主题
    this.initChart();
  },
  methods: {
    initChart() {
      // 初始化echart
      let el = document.getElementById(this.id);
      this.chart = this.$echarts.init(el, "tdTheme");
      axios
        .get("/map/city/140100.json")
        .then((res) => {
          let data = res.data;
          this.data = res.data.features;
          let d = [];
          for (var i = 0; i < data.features.length; i++) {
            d.push({
              name: data.features[i].properties.name,
            });
          }
          //注册地图
          this.$echarts.registerMap("太原市", data);
          //绘制地图
          // this.renderMap("太原市", this.mapdata);
          this.renderMap("太原市", this.cdata);
        })
        .catch((err) => {
          console.log(err, err);
        });
        this.chart.off("click")
      //地图点击事件
      this.chart.on("click", (params) => {
        console.log(params);
        this.chart.dispatchAction({
          type: "downplay",
        });
        //点击高亮
        this.chart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          // 使用 dataIndex 来定位节点。
          dataIndex: params.dataIndex,
        });
        this.$store.commit("SET_BCITYID", cityMap[params.name]);
      });
      // this.chart.on('georoam', params=> {
      //   if(params.dy || params.dx) return //排除拖拽
      //   let option = this.chart.getOption();
      //   let zoom = option.series[0].zoom;
      //   this.chart.clear();
      //   this.chart.setOption(option,true);
      // })
    },
    renderMap(map, newData) {
      // this.options.title.subtext = map;
      this.options.geo = {
        show: true,
        zoom: 1.1,
        map: map,
        label: {
          normal: {
            show: true,
            color: "rgb(249, 249, 249)", //省份标签字体颜色
            fontSize:  this.autoWidth(13),
          },
          emphasis: {
            show: true,
            color: "#f75a00",
            fontSize:  this.autoWidth(18),
            fontWeight: "bold",
          },
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: "#24CFF4",
            borderColor: "#53D9FF",
            borderWidth: 1,
            shadowBlur: 7,
            shadowColor: "rgb(58,115,192)",
            shadowOffsetX: 7,
            shadowOffsetY: 6,
          },
          emphasis: {
            areaColor: "#8dd7fc",
            borderWidth: 1.6,
            shadowBlur: 25,
            // shadowColor: "#00f2fc",
          },
        },
      };
      this.options.series = [
        {
          name: map,
          type: "map",
          geoIndex: 0,
          mapType: map,
          roam: true,
          zoom: 1.5,
          // nameMap: {
          //   china: "中国",
          // },
          left: "center",
          align: "right",
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          data: this.mapdata,
        },
        {
          name: "地点",
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 2,
          // label: {
          //   emphasis: {
          //     show: true,
          //     position: "right",
          //     formatter: "{b}",
          //   },
          // },
          symbol: "circle",
          symbolSize: 2,
          showEffectOn: "render",
          rippleEffect: {
            brushType: "fill",
          },
          itemStyle: {
            normal: {
              color: "#F4E925",
              shadowBlur: 10,
              shadowColor: "#333",
            },
          },
          data: newData.citys,
        },
        {
          name: "线路",
          type: "lines",
          coordinateSystem: "geo",
          zlevel: 2,
          large: true,
          effect: {
            show: true,
            constantSpeed: 30,
            symbol: "arrow", //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: 6,
            trailLength: 0,
          },
          lineStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#58B3CC",
                  },
                  {
                    offset: 1,
                    color: "#F58158",
                  },
                ],
                false
              ),
              width: 1,
              opacity: 0.6,
              curveness: 0.2,
            },
          },
          data: newData.moveLines || [],
        },
      ];
      //渲染地图
      this.chart.setOption(this.options, true);
    },
  },
};
</script>

<style lang="scss" scoped>
.map-warp {
  position: relative;
  height: 100%;
}
</style>

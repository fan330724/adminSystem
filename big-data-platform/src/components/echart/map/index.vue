<template>
  <div class="map-warp">
    <div class="back-btn" @click="backProvince">省份地图</div>
    <div
      :id="id"
      :class="className"
      :style="{ height: height, width: width }"
    />
  </div>
</template>

<script>
import tdTheme from "@/common/echart/theme.json"; // 引入默认主题
import resizeMixins from "@/utils/resizeMixins";
import autiChoiceMixins from "@/utils/echart/auto-choice";
import axios from "axios";
const cityMap = {
  太原市: "140100",
  大同市: "140200",
  阳泉市: "140300",
  长治市: "140400",
  晋城市: "140500",
  朔州市: "140600",
  晋中市: "140700",
  运城市: "140800",
  忻州市: "140900",
  临汾市: "141000",
  吕梁市: "141100",
};
export default {
  name: "echart",
  mixins: [resizeMixins, autiChoiceMixins],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    auto: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chart: null,
      mapdata: [{
          name: '太原市',
          value: 119,
        },
        {
          name: '阳泉市',
          value: 8,
        },
        {
          name: '大同市',
          value: 7,
        },
        {
          name: '长治市',
          value: 6,
        },
        {
          name: '晋城市',
          value: 5,
        },
        {
          name: '朔州市',
          value: 4,
        },
        {
          name: '晋中市',
          value: 3,
        },
        {
          name: '忻州市',
          value: 2,
        },
        {
          name: '临汾市',
          value: 3,
        },
        {
          name: '运城市',
          value: 53,
        },
        {
          name: '吕梁市',
          value: 12,
        }],
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
          type: 'piecewise',
          seriesIndex: 0,
          // 颜色
          inRange: {
            color: ["#11CFEF", "#1D79FD"],
          },
        },
        grid: {
          top: "10%",
          left: "16%",
        },
        // 底部背景
        series: [
          // {
          //   type: 'effectScatter',
          //   coordinateSystem: 'geo',
          //   symbolSize: 7,
          //   effectType: 'ripple',
          //   legendHoverLink: false,
          //   showEffectOn: 'render',
          //   rippleEffect: {
          //     period: 4,
          //     scale: 2.5,
          //     brushType: 'stroke',
          //   },
          //   zlevel: 1,
          //   itemStyle: {
          //     normal: {
          //       color: '#99FBFE',
          //       shadowBlur: 5,
          //       shadowColor: '#fff',
          //     },
          //   },
          //   data: convertData(seriesData),
          // },
        ],
      },
      allData: {
        citys: [
          // {
          //   name: "阳曲西站",
          //   value: [112.654262,38.077842, 4],
          //   symbolSize: 12,
          //   itemStyle: { normal: { color: "#FF7DA1" } },
          // },
          // {
          //   name: "清徐站",
          //   value: [112.317927,37.564307, 8],
          //   symbolSize: 12,
          //   itemStyle: { normal: { color: "#FF7DA1" } },
          // },
        ],
        "moveLines":[
          // {"fromName":"阳曲西站","toName":"清徐站","coords":[[112.654262,38.077842],[112.317927,37.564307]]}
        ]
      },
    };
  },
  // watch: {
  //   options: {
  //     handler(options) {
  //       // 设置true清空echart缓存
  //       this.chart.setOption(options, true);
  //       // if (this.auto) {
  //       //   this.seriesDataLen = options.series[0].data.length;
  //       //   this.handleMapRandomSelect(this.chart); //autiChoiceMixins自动高亮显示
  //       // }
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
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
        .get("/map/province/shanxi.json")
        .then((res) => {
          console.log(data, "data");
          let data = res.data;
          let d = [];
          for (var i = 0; i < data.features.length; i++) {
            d.push({
              name: data.features[i].properties.name,
            });
          }
          // this.mapdata = d;
          this.allData= {
            citys: [
              {
                name: "太原市",
                value: [112.354262,37.857842, 4],
                symbolSize: 14,
                itemStyle: { normal: { color: "#FF7DA1" } },
              },
            ],
            "moveLines":[]
          };
          //注册地图
          this.$echarts.registerMap("山西", data);
          //绘制地图
          this.renderMap("山西", this.mapdata);
        })
        .catch((err) => {
          console.log(err, err);
        });
      //地图点击事件
      this.chart.on("click", (params) => {
        console.log(params);
        this.$store.commit("SET_CITYID",cityMap[params.name])
        this.$store.commit("SET_PROVINCEID",'')
        //显示县级地图
        axios.get("/map/city/" + cityMap[params.name] + ".json").then((res) => {
          let data = res.data;
          this.allData= {
            citys: [],
            "moveLines":[]
          };
          this.$echarts.registerMap(params.name, data);
          var d = [];
          for (var i = 0; i < data.features.length; i++) {
            d.push({
              name: data.features[i].properties.name,
            });
            
          }
          this.renderMap(params.name, d);
        });
        // if (this.auto) {

        // }
      });
    },
    //返回省份地图
    backProvince() {
      this.allData= {
        citys: [
          {
            name: "太原市",
            value: [112.354262,37.857842, 4],
            symbolSize: 14,
            itemStyle: { normal: { color: "#FF7DA1" } },
          },
        ],
        "moveLines":[]
      };
      this.renderMap("山西", this.mapdata);
      this.$store.commit("SET_PROVINCEID",'140000')
      this.$store.commit("SET_CITYID",'');
    },
    renderMap(map, data) {
      // this.options.title.subtext = map;
      this.options.geo= {
        show: false,
        map: map,
        label: {
          emphasis: {
            show: false,
          },
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: "#323c48",
            borderColor: "#404a59",
          },
          emphasis: {
            areaColor: "#2a333d",
          },
        },
      };
      this.options.series = [
        {
          name: map,
          type: "map",
          mapType: map,
          roam: false,
          nameMap: {
            china: "中国",
          },
          left: 'center',
          align: 'right',
          itemStyle: {
            normal: {
              color: "red",
              areaColor: "rgba(19,54,162, .5)",
              borderColor: "rgba(0,242,252,.3)",
              borderWidth: 1,
              shadowBlur: 7,
              shadowColor: "#00f2fc",
            },
            emphasis: {
              areaColor: "#4f7fff",
              borderColor: "rgba(0,242,252,.6)",
              borderWidth: 2,
              shadowBlur: 10,
              shadowColor: "#00f2fc",
            },
          },
          label: {
            formatter: (params) => `${params.name}`,
            show: true,
            position: "insideRight",
            textStyle: {
              fontSize: 13,
              color: "#efefef",
            },
            emphasis: {
              textStyle: {
                color: "#fff",
              },
            },
          },
          data: data,
        },
        {
          name: "地点",
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 2,
          rippleEffect: {
            brushType: "stroke",
            period: 7,
            scale: 3,
          },
          label: {
            emphasis: {
              show: true,
              position: "right",
              formatter: "{b}",
            },
          },
          symbol: 'circle',
          symbolSize: 2,
          showEffectOn: "render",
          itemStyle: {
            normal: {
              color: "#FF7DA1",
            },
          },
          data: this.allData.citys,
        },
      ];
      if(map !== '山西'){
        this.options.series.push({
          name: '线路',
          type: 'lines',
          coordinateSystem: 'geo',
          zlevel: 2,
          large: true,
          effect: {
            show: true,
            constantSpeed: 30,
            symbol: 'arrow',//ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: 6,
            trailLength: 0,
          },
          lineStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0, color: '#58B3CC'
                }, {
                  offset: 1, color: '#F58158'
                }], false),
              width: 1,
              opacity: 0.6,
              curveness: 0.2
            }
          },
          data: this.allData.moveLines
        })
      }
      //渲染地图
      this.seriesDataLen = this.options.series[0].data.length;
      this.handleMapRandomSelect(this.chart); //autiChoiceMixins自动高亮显示
      this.chart.setOption(this.options);
      
    },
  },
};
</script>

<style lang="scss" scoped>
.map-warp {
  position: relative;
  height:100%;
  .back-btn {
    position: absolute;
    top: 40px;
    right: 10px;
    z-index: 3;
    cursor: pointer;
  }
}
</style>

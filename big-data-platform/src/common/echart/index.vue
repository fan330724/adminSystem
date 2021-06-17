<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import tdTheme from './theme.json' // 引入默认主题
import resizeMixins from "@/utils/resizeMixins";
import autiChoiceMixins from "@/utils/echart/auto-choice";

export default {
  name: 'echart',
  mixins: [resizeMixins,autiChoiceMixins],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },
    options: {
      type: Object,
      default: ()=>({})
    },
    auto: {
      type: Boolean,
      default: false
    },
    openLoading:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    options: {
      handler (options) {
        // 设置true清空echart缓存
        this.chart.setOption(options, true);
        if(this.auto){
          this.seriesDataLen = options.series[0].data.length;
          this.handleMapRandomSelect(this.chart); //autiChoiceMixins自动高亮显示
        };
        if(this.openLoading){
          let seriesDataLen = options.series[0].data.length;
          if(seriesDataLen>0){
            this.chart.hideLoading();
          }
        }
      },
      deep: true
    }
  },
  mounted () {
    this.$echarts.registerTheme('tdTheme', tdTheme); // 覆盖默认主题
    this.initChart();
  },
  methods: {
    initChart () {
      // 初始化echart
      this.chart = this.$echarts.init(this.$el, 'tdTheme');
      if(this.openLoading){
        this.chart.showLoading({
          text: '',
          color: '#00FCFF',
          textColor: '#00FCFF',
          maskColor: 'rgba(0, 0, 0, 0.1)',
        });
      }
      this.chart.setOption(this.options, true);
      if(this.auto){
        this.seriesDataLen = this.options.series[0].data.length;
        this.handleMapRandomSelect(this.chart); //autiChoiceMixins自动高亮显示
      }
    }
  }
}
</script>

<style>
</style>

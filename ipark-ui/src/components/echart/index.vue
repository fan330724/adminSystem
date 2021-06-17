<template>
  <div class="chart" style="width: 100%"></div>
</template>

<script>
// import { merge } from 'lodash';
import echart from "echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import  BASIC_OPTION  from "./default_option";
import COLOR_ARRAY from "./color";
import ResizeListener from 'element-resize-detector';

export default {
  name: "Chart",
  props: {
    extraOption: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    seriesData() {
      return this.extraOption.series || [];
    },
    //用于下面的resize 改变图表尺寸，在容器大小发生改变时需要手动调用
    isCollapse() {
      return this.$store.state.common.isCollapse;
    },
  },
  watch: {
    seriesData: {
      deep: true,
      handler() {
        this.updateChartView();
      },
    },
    //监听isCollapse 因为头部水平扩展是一个动画需要时间，所以这里延迟300毫秒
    isCollapse() {
      setTimeout(() => {
        this.handleWindowResize();
      }, 300);
    },
  },
  mounted() {
    this.chart = echart.init(this.$el);
    this.updateChartView();
    window.addEventListener("resize", this.handleWindowResize);
    this.addChartResizeListener();  //解决有时候监听不到窗口变化导致图形超出canvas
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
  methods: {
    /**
     * 将业务数据加入到基础样式配置中
     * @returns {Object} 完整的echart配置
     */
    assembleDataToOption() {
      // const formatter = name => {
      //   const total = this.seriesData.reduce((acc, cur) => acc + cur.value, 0);
      //   const data = this.seriesData.find(item => item.name === name) || {};
      //   const percent = data.value
      //     ? `${Math.round((data.value / total) * 100)}%`
      //     : '0%';

      //   return `{a|${name}}{b|${percent}}`;
      // };

      return Object.assign(
        {},
        BASIC_OPTION,
        { color: COLOR_ARRAY },
        {
          // legend: { formatter },
          series: [{ data: this.seriesData }],
        },
        this.extraOption
      );
    },

    /**
     * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
     */
    addChartResizeListener() {
      const instance = ResizeListener({
        strategy: 'scroll',
        callOnAdd: true
      });

      instance.listenTo(this.$el, () => {
        if (!this.chart) return;
        this.chart.resize();
      });
    },
    updateChartView() {
      if (!this.chart) return;

      const fullOption = this.assembleDataToOption();
      this.chart.setOption(fullOption, true);
    },

    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    handleWindowResize() {
      if (!this.chart) return;
      this.chart.resize();
    },
  },
};
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
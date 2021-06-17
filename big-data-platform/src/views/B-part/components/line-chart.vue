<template>
  <div>
    <Chart :cdata="cdata" height="24vh"/>
  </div>
</template>

<script>
import Chart from "@/components/echart/line/index.vue";
export default {
  props:{
    sign:{
      type:String,
      default:'all'
    }
  },
  data() {
    return {
      cdata: {
        data: [
          {
            name:'车辆入场峰值',
            data:[502.84, 205.97, 332.79, 281.55, 398.35, 214.02, 502.84, 205.97]
          },
          {
            name:'车辆出场峰值',
            data:[281.55, 398.35, 214.02, 502.84, 205.97,502.84, 205.97, 332.79 ]
          }
        ],
      },
    };
  },
  components: {
    Chart,
  },
  mounted() {
    this.setData();
  },
  methods: {
    // 根据自己的业务情况修改
    setData() {
      if(this.sign === 'out'){
        this.cdata.data = [
          {
            name:'车辆出场峰值',
            data:[281.55, 398.35, 214.02, 502.84, 205.97,502.84, 205.97, 332.79 ]
          }
        ];
        this.cdata.colorList = [
          {
            name: "#00CD9E",
            rgb: "0,205,158",
          }
        ]; 
      }else if(this.sign === 'in'){
        this.cdata.data = [
           {
            name:'车辆入场峰值',
            data:[502.84, 205.97, 332.79, 281.55, 398.35, 214.02, 502.84, 205.97]
          }
        ];
        this.cdata.colorList = [
          {
            name: "#F59D05",
            rgb: "245,157,5",
          }
        ]; 
      }else{
        this.cdata.data = [
          {
            name:'车辆入场峰值',
            data:[502.84, 205.97, 332.79, 281.55, 398.35, 214.02, 502.84, 205.97]
          },
          {
            name:'车辆出场峰值',
            data:[281.55, 398.35, 214.02, 502.84, 205.97,502.84, 205.97, 332.79 ]
          }
        ]
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <main>
    
    <div class="part final-income-part">
      <h4>
        <span>财务收入情况</span>
          <!-- <el-select v-model="curYear" placeholder="请选择年份" size="mini">
            <el-option
              v-for="item in yearList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
        <el-date-picker
          v-model="curYear"
          type="year" :picker-options="yearPicker"
          value-format="yyyy"
          placeholder="选择年" size="mini" style="width:25%;min-width:90px" @change="getIncomeData" :clearable="false">
        </el-date-picker>
      </h4>
      <div class="main">
        <echart-comp :extraOption="incomeOption"></echart-comp>
      </div>
    </div>
    
    <div class="part month-income-part">
      <h4><span>本月收入详细数据</span></h4>
      <div class="main">
        <div class="header">
          ￥{{incomeDetail.monthMoney || 0}}
        </div>
        <div class="item">
          <span class="title">支付宝支付金额</span>
          <span class="num">￥{{incomeDetail.alipayMoney || 0}}</span>
        </div>
        <div class="item">
          <span class="title">微信支付金额</span>
          <span class="num">￥{{incomeDetail.wxpayMoney || 0}}</span>
        </div>
        <div class="item">
          <span class="title">现金支付金额</span>
          <span class="num">￥{{incomeDetail.payMoney || 0}}</span>
        </div>
        <div class="item">
          <span class="title">银行卡支付金额</span>
          <span class="num">￥{{incomeDetail.unionpayMoney || 0}}</span>
        </div>
      </div>
      
    </div>

    <div class="part month-expend-part">
      <h4><span>本月支付方式分布</span></h4>
      <div class="main">
        <echart-comp :extraOption="expendOption"></echart-comp>
      </div>
    </div>

  </main>
</template>

<script>

import { getIncomeData , getIncomeDetail , getPayTypeData } from '@/api/pay/finalStat'
import echartComp from '@/components/echart/index'
export default {
  components:{
    echartComp
  },
  data(){
    return {
      yearList:[],
      curYear:'',
      yearPicker:{
        disabledDate(year){
          let temp = new Date(year).getFullYear();
          let curYear = new Date().getFullYear();
          if(temp > curYear){
            return true
          }
        }
      },
      incomeDetail:{},
      incomeOption:{
        title: {
            show: false
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
            formatter:'{b}: {c}元'

        },
        grid: {
          top:'30',
          left: '4%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            axisTick:{
              show:false
            },
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月']
          }
        ],
        yAxis: [
          {
            name:'收入/元',
            nameGap:10,
            nameLocation:'end', 
            max: function (value) {
              return parseInt(value.max * 1.2);
            },
            splitLine:{
              show:false
            },
            axisTick:{
              show:false
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: '财务收支',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0]
          }
        ]
      },
      expendOption:{  //支出echarts图表配置文件
        title: {
            text: '',
        },
        tooltip: {
          trigger: 'item',
          formatter: '支出占比 <br/>{b} : {c}元 ({d}%)'
        },
        legend: {
          orient:'vertical',
          top: 'middle',
          right: '2%'
        },
        grid: {
            left: '2%',
            right: '6%',
            bottom: '3%',
            containLabel: true
        },
        series: [
          {
            // name: '面积模式',
            type: 'pie',
            center: ['43%', '50%'],
            // roseType: 'area',
            itemStyle: {
              borderRadius: 8,
              borderType:'dotted'
            },
            radius:['16%','80%'],
            data: []
          }
        ]
      }
    }
    
  },
  mounted(){
    let now = new Date();
    this.curYear = String(now.getFullYear());
    this.getIncomeData();
    this.getIncomeDetail();
    this.getPayTypeData();
  },
  /**
   * 获取收入统计
   */
  methods:{
    /**
     * 获取本年收入情况
     */
    getIncomeData(){
      getIncomeData({createDate:this.curYear}).then(res=>{
        if(res.data && res.data.data && res.data.data.length>0){
          let data = res.data.data.map(i=>{
            return i.monthMoney;
          })
          this.incomeOption.series[0].data = data;
        }        
      })
    },
    /**
     * 获取收入详情
     */
    getIncomeDetail(){
      getIncomeDetail().then(res=>{
        if(res.data && res.data.data){
          let data = res.data.data;
          this.incomeDetail = data;
        }        
      })
    },
    /**
     * 获取支付方式分布数据
     */
    getPayTypeData(){
      getPayTypeData().then(res=>{
        if(res.data && res.data.data && res.data.data.length>0){
          let yAxis_data = [];
          let data = [];
          let result = res.data.data.map(i=>{
            return {
              value:i.value,
              name:i.name
            }
          })
          result = result.filter(i=>{return i.name !== '总收入' && i.value!==0});
          this.expendOption.series[0].data = result;
        }        
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height:33vh;
  }
  .part {
    width:32.7%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .main {
      flex:1;
    }
  }
  h4 {
    padding:10px 5px;
    margin:0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color:#409EFF;
    font-weight: 600;
    font-size: 17px;
    border-bottom: 1px solid #eee;
    margin:0 20px;
  }
  .month-income-part {
    .main {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding:15px;
      .header {
        font-size: 25px;
        font-weight: 600;
      }
      .item {
        border-bottom: 1px solid #ccc;
        padding:2% 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        
        .title {
          display: inline-block;
           min-width: 150px;
           font-size: 14px;
        }
        .num {
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
</style>
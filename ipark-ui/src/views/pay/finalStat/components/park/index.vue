<template>
  <div class="fina-park-contain">
    <div class="header">
      <div class="title">        
        <span>车场数据</span>
        <span class="detail">(今日数据 每一分钟更新)</span>
      </div>

      <div>
        <el-radio-group v-model="curDateType" @change="changeType">
          <el-radio-button v-for="(item,index) in dateTypeList" :key="index" :label="item.value">{{item.label}}</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    
    <div class="list">
      <div class="item">
        <div class="top">
          <div class="top-left">
            <div class="title">总订单数</div>
            <div class="sum"><span class="sign"></span>{{parkData.count}}</div>
            <div class="last-sum"><span class="label">{{lastDateSign}}总订单数：</span><span>{{parkData.yescount}}</span></div>
          </div>
          <div class="top-right">
            <img src="/img/pay/down.png" alt="" v-if="parkData.count < parkData.yescount">
            <img src="/img/pay/up.png" alt="" v-else>
          </div>
        </div>

        <div class="bottom">
          <progress-comp :width="parkData.oderpeak" :color="parkData.count < parkData.yescount?'#FE5732':'#10C5B1'"></progress-comp>
        </div>
        
      </div>

      <div class="item">
        <div class="top">
          <div class="top-left">
            <div class="title">总收入金额</div>
            <div class="sum"><span class="sign">￥</span>{{parkData.money}}</div>
            <div class="last-sum"><span class="label">{{lastDateSign}}总收入金额：</span><span>￥{{parkData.yesMoney}}</span></div>
          </div>
          <div class="top-right">
            <img src="/img/pay/down.png" alt="" v-if="Number(parkData.money) < Number(parkData.yesMoney)">
            <img src="/img/pay/up.png" alt="" v-else>
          </div>
        </div>

        <div class="bottom">
          <progress-comp :width="parkData.peakValue" :color="Number(parkData.money) < Number(parkData.yesMoney)?'#FE5732':'#10C5B1'"></progress-comp>
        </div>
        
      </div>
    </div>
    

  </div>

</template>

<script>
import echartComp from '@/components/echart/index'
import progressComp from '@/components/cum-progressbar/index'
import { getGateData } from '@/api/pay/finalStat'
export default {
  components:{
    echartComp,
    progressComp
  },
  data(){
    return {
      curDateType:'today',
      parkData:{},
      dateTypeList:[
        {
          label:'今日',
          value:'today'
        },
        {
          label:'本周',
          value:'week'
        },
        {
          label:'本月',
          value:'month'
        }
      ],
      lastDateSign:'昨日'
    }
  },
  mounted(){
    this.getGateData();
    this.interval = setInterval(()=>{
      this.getGateData();
    },60000); //1分钟自动刷新数据
  },
  destroyed(){
    clearInterval(this.interval);
  },
  methods:{
    /**
     * 获取岗亭数据
     */
    getGateData(){
      getGateData().then(res=>{
        if(res.data && res.data.data){
          this.parkAllData = res.data.data;
          for(var key in this.parkAllData){
            this.parkAllData[key][0].peakValue = parseInt(Math.abs(Number( this.parkAllData[key][0].peakValue) * 100));
            this.parkAllData[key][0].oderpeak = parseInt(Math.abs(Number( this.parkAllData[key][0].oderpeak) * 100));
          }
        }else{
          this.parkAllData = {
            today:[{}],
            week:[{}],
            month:[{}]
          }
        }
        this.changeType(this.curDateType);        
      })
    },
    changeType(val){
      this.parkData = this.parkAllData[val][0];
      console.log(this.parkAllData[val][0],'parkData')
      if(val === 'today'){
        this.lastDateSign = '昨日';
      }else if(val === 'week'){
        this.lastDateSign = '上周';
      }else{
        this.lastDateSign = '上月'
      }
    }
  }
}
</script>

<style lang="scss">
  .fina-park-contain .el-progress-bar__innerText {
    vertical-align: top;
  }
</style>

<style lang="scss" scoped>
  .fina-park-contain {
    background-color: #fff;
    margin-top:1.5vh;
    padding-bottom: 20px;
  }
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding:10px 15px;
    .title {
      font-size: 18px;
      font-weight: 600;
      color:#409EFF;
      .detail {
        font-size: 14px;
        color:#ccc;
        margin-left:10px;
        font-weight: 500;
      }
    }
  }

  .list {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding:1% 6%;
    .item {
      width:40%;
      height:23vh;
      padding:15px 15px 0;
      //background-color: #EFF1F4;
      //border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      box-shadow:0 4px 8px rgba(0, 0, 0, .3);
      .top {
        flex:1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .top-left {
          flex:1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-bottom: 40px;
          .title {
            font-size: 20px;
            font-weight: 600;
          }
          .sum {
            font-size: 25px;
            font-weight: 600;
            .sign {
              color:#409EFF;
            }
          }
          .last-sum {
            color:#999;
            font-size: 14px;
          }
        }
        .top-right {
          flex:1;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            width:70%;
          }
        }
      }
      .bottom {
        position: absolute;
        bottom:0;
        left:0;
        right:0;
      }
    }
  }
  
</style>
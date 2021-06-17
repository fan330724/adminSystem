<template>
<div class="detail-record">

  <div class="flex flex-dir-row card-header">
    <span class="item" v-for="(item,index) in headerList" :key="index" :class="activeType === item.key?'active':''" @click="choicePeriod(item)">{{item.name}}</span>
  </div>

  <dv-scroll-board :config="config" class="special-part cum-scroll-board" :key="key"/>

</div>
</template>

<script>
  import { parkingRecords } from "@/api/detail"
  export default {
    data(){
      return {
        config:{
          header: ['时间', '车牌号', '时长', '支付金额'],
          data: [],
          headerBGC:'transparent',
          oddRowBGC:'transparent',
          evenRowBGC:'transparent',
          waitTime:3000,
          align:['center','center','center'],
        },
        key:0,
        activeType:'in',
        headerList:[
          {name:'入场记录',key:'in'},
          {name:'出场记录',key:'out'},    
        ]
      };
    },
    created() {
      window.addEventListener('resize', this.resize, false);
    },
    mounted(){
      this.getData();
    },
    beforeDestroy() {
      window.removeEventListener('reisze', this.resize);
    },
    methods:{
      /**
       * 获取数据
       */
      getData(){
        let params = {
          parkId:'904',
          InOrOut: this.activeType
        }
        parkingRecords(params).then(res=>{
           if(res && res.data && res.data.length>0){
            this.config.data = res.data.map(i=>{
              let time = i.payTime.slice(0,10);
              let plantNum = i.plate_number.substr(0,2)+'***'+i.plate_number.substr(5,i.plate_number.split('').length);
              return [time,plantNum,i.hour,i.SSJE];
              }) 
            this.resize();
            console.log(this.config.data)
          }else{
            this.config.data = [];
          }
        })
      },
      formatPlate(carnum){
        if(!carnum)return'';
        const numBegin = carnum.substring(0, 2);
        const numEnd = carnum.substring(5);
        return numBegin + '***' + numEnd;	
      },
      resize(){
        let time = new Date();
        this.$nextTick(()=>{
          this.key = time.getTime();
          console.log(this.key)
        })
      },
       choicePeriod(item){
        this.activeType = item.key;
        this.getData();
      }
    }
  }
</script>

<style lang='scss'>
  .dv-scroll-board.cum-scroll-board {
    .header {
      background-color: RGBA(26,71,240,.3);
      box-shadow: inset 0 0 10px RGBA(26,71,240,1);
      .header-item {
        font-size: 13px;
        font-weight: 600;
        color:#00F9FF;
        height:30px !important;
        line-height: 30px !important;
        text-align: center;
      }
    }
    .row-item {
      border-bottom: 1px solid rgba(0,249,255,.2);
    }
    .rows {
      .ceil {
        padding:0 2px;
        font-size: 12px;
        text-align: center;
        &:nth-last-child(1){
          color:#00F9FF;
        }
      }
    }
  }

</style>

<style lang="scss" scoped>
  .detail-record {
    height: 100%;;
  }

  .cum-scroll-board {
    height:100%;
  }

  .card-header {
    margin: 10px 0;
    padding:0 20px;
    border-bottom: 1px solid #00FCFF;
    align-items: stretch;
    .item {
      margin-right:30px;
      padding:5px 20px;
      color:#00FCFF;
      font-size: 13px;
      font-weight:600;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      cursor: pointer;
      &.active {
        background-color: #00FCFF;
        color:#000;
      }
    }
  }
  
</style>
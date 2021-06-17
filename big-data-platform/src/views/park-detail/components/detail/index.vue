<template>
  <div>
    <div class="flex-between flex-dir-row park-part">
      <div class="flex-center flex-dir-column info">
        <span class="num">{{info.space}}</span>
        <span class="title">总车位</span>
      </div>

      <!-- <car-comp></car-comp> -->
      <img src="../../../../assets/images/detail/car.png" class="car-top-img" alt="">

      <div class="flex-center flex-dir-column info">
        <span class="num">{{info.empty_space}}</span>
        <span class="title">剩余车位</span>
      </div>
    </div>

    <div class="flex flex-dir-row income-part">

     
        <div class="flex-1 item">
          <p class="title">今日车辆总数</p>
          <foursquare-border class="num">
            <span class="txt">{{info.todayCarCount}}</span>
            <div class="percent" style="width:50%;"></div>
          </foursquare-border>
        </div>
      

      <div class="flex-1 item">
        <p class="title">今日收入</p>
        <foursquare-border class="num">
          <span class="txt">{{info.todayMoneyCount}}</span>
          <div class="percent" style="width:70%;"></div>
        </foursquare-border>
      </div>

    </div>

    <div class="flex-around flex-dir-row type-part">
      <div class="flex-center flex-dir-column item" v-for="(item,index) in typeList" :key="index">
        <img class="sign" :src="item.img" alt="">
        <p class="num">{{info[item.key]}}</p>
        <p class="title">{{item.title}}</p>
      </div>
    </div>


  </div>
</template>

<script>
  import foursquareBorder from '@/components/layout/border-style/foursquare'
  import { getParkInfo } from "@/api/detail"
  export default {
    components:{
      foursquareBorder
    },
    data(){
      return {
        info:{
          empty_space:0,
          space:0,
          todayCarCount:0,
          todayMoneyCount:0,
          visitorCar:0,
          temporaryCar:0,
          specialCar:0
        },
        typeList:[
          {
            img: require('../../../../assets/images/detail/car1-icon.png'),
            title:'访客车辆',
            key:'visitorCar'
          },
          {
            img:require('../../../../assets/images/detail/car2-icon.png'),
            title:'临时车辆',
            key:'temporaryCar'
          },
          {
            img:require('../../../../assets/images/detail/car3-icon.png'),
            title:'特殊车辆',
            key:'specialCar'
          }
        ]
      }
    },
    mounted(){
      this.getData();
    },
    methods:{
      /**
       * 获取数据
       */
      getData(){
        let params = {
          parkId:'904'
        }
        getParkInfo(params).then(res=>{
          if(res && res.data){
            this.info = res.data;
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  .park-part {
    margin-top:25px;
    padding:0 30px;
    .info {
      box-sizing: border-box;
      padding:35px 15px;
      width: 100px;
      border-left-width: 4px;
      border-left-style: solid;
      border-right-width: 4px;
      border-right-style: solid;
      border-radius: 4px;
      .title {
        font-size: 13px;
      }
      .num {
        color:#fff;
        font-size: 32px;
        margin-bottom: 22px;
        font-weight: 600;
      }
      &:nth-of-type(1){
        border-color: rgba(0,203,246,1);
        background-color: rgba(0,203,246,0.3);
        text-shadow: 0 0 15px rgba(0,203,246,1);
      }
      &:nth-of-type(2){
        border-color: rgba(222,190,36,1);
        background-color: rgba(222,190,36,0.3);
        text-shadow: 0 0 15px rgba(222,190,36,1);
      }
    }
    .car-top-img {
      width:50%
    }
  }

  .income-part {
    margin-top:30px;
    padding:0 40px;
    .item {
      &:nth-of-type(1){
        margin-right: 10px;
      }
      .title {
        color:#fff;
        font-size: 13px;
        margin-bottom: 10px; 
      }
      .num {
        position: relative;
        height:43px;
        background-color: rgba(0,201,250,.2);
        text-align: center;
        font-size: 28px;
        font-weight: 600;
        color:#fff;
        text-shadow: 0 0 5px #00FAFF;
        .txt {
          position: absolute;
          top:50%;
          left:50%;
          transform: translate(-50%,-50%);
          z-index: 1;
        }
        .percent {
          position: absolute;
          top:0;
          left:0;
          bottom: 0;
          background-image: linear-gradient(to right, rgba(0,199,231,.1) , rgba(0,199,231,.6));
          z-index: 0;
        }
      }
      
    }
  }

  .type-part {
    margin-top: 40px;
    padding:0 40px;
    .item {
      .sign {
        width:100px;
        height:100px;
        margin-bottom: 20px;
      }
      .num {
        height:33px;
        line-height: 35px;
        width:100px;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
        color:#fff;
      }
      &:nth-of-type(1){
        .num {
          border-bottom-color: #00D6FF;
          text-shadow: 0 0 3px #00D6FF;
          background-image: linear-gradient(to top,rgba(0,214,255,.4),rgba(0,214,255,0));
        }
      }
      &:nth-of-type(2){
        .num {
          border-bottom-color: #00FFEC;
          text-shadow: 0 0 3px #00FFEC;
          background-image: linear-gradient(to top,rgba(0,255,236,.4),rgba(0,255,236,0));
        }
      }
      &:nth-of-type(3){
        .num {
          border-bottom-color: #FFE56C;
          text-shadow: 0 0 3px #FFE56C;
          background-image: linear-gradient(to top,rgba(255,229,108,.4),rgba(255,229,108,0));
        }
      }
      .title {
        color: rgba(255,255,255,.8);
        font-size: 13px;
        text-align: center;
      }
    }
  }

</style>
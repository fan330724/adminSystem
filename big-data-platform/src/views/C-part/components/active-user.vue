<template>
  <div class="card-part">

    <div class="flex-around flex-dir-row card-header">
      <span class="item" v-for="(item,index) in headerList" :key="index" :class="activeType === item.key?'active':''" 
      @click="choicePeriod(item)">{{item.name}}</span>
    </div>

    <div class="flex flex-dir-row card-content">
      <div class="flex-between flex-dir-row item" v-for="(item,index) in list" :key="index">
        <img class="sign-img" :src="item.img" alt="">
        <p class="flex-end  flex-dir-column right">
          <span class="title">{{item.title}}</span>
          <span class="num-area"><span class="num">{{dataSets[activeType][item.key]}}</span>{{item.unit}}</span>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  import { getActiveUser } from "@/api/c-part"
  export default {
    data(){
      return {
        activeType:'month',
        headerList:[
          {name:'月活跃用户',key:'month'},
          {name:'周活跃用户',key:'week'},    
          {name:'日活跃用户',key:'today'}
        ],
        list:[
          {
            title: '停车场支付用户',
            key: 'payUser',
            img:require('@/assets/images/c-part/active-user/payUser.png'),
            unit: '人'
          },
          {
            title: '累计访问次数',
            key: 'visitTimes',
            img:require('@/assets/images/c-part/active-user/visitTimes.png'),
            unit: '人'
          },
          {
            title: '洗车用户',
            key: 'washUser',
            img:require('@/assets/images/c-part/active-user/washUser.png'),
            unit: '人'
          },
          {
            title: '累计活跃用户数',
            key: 'activeUser',
            img:require('@/assets/images/c-part/active-user/activeUser.png'),
            unit: '人'
          },
          {
            title: '加油卡会员用户',
            key: 'comeOnMemberUser',
            img:require('@/assets/images/c-part/active-user/comeOnMemberUser.png'),
            unit: '人'
          },
          {
            title: '停车劵用户',
            key: 'stopUser',
            img:require('@/assets/images/c-part/active-user/stopUser.png'),
            unit: '人'
          },
        ],
        dataSets:{
          month:{},
          week:{},
          today:{}
        }
      }
    },
    mounted(){
      this.getData();
    },
    methods:{
      choicePeriod(item){
        this.activeType = item.key;
      },
      /**
      * 获取数据
      */
      getData(){
        getActiveUser().then(res=>{
          if(res && res.data){
            this.dataSets = res.data[0];
          }else{
            this.dataSets={
              month:[],
              week:[],
              today:[]
            };
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  .card-header {
    margin: 15px 0;
    border-bottom: 2px solid #00C4E3;
    align-items: stretch;
    .item {
      padding:8px 16px;
      color:#00C4E3;
      font-size: 16px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      cursor: pointer;
      &.active {
        background-color: #00C4E3;
        color:#fff;
      }
    }
  }
  .card-content {
    flex-wrap: wrap;
    padding-left: 3%;
    .item {
      box-sizing: border-box;
      width:46%;
      margin: 0 4% 12px 0;
      padding:22px 15px;
      background-color: RGBA(8,9,126,.7);
      box-shadow: inset 0 0 10px RGBA(0,6,255,1);
      border-radius: 15px;
      .sign-img {
        height:50px;
        width:50px;
        border-radius: 50%;
      }
      .right {
        align-items: flex-end;
        .title {
          font-size: 14px;
          margin-bottom: 15px;
        }
        .num-area {
          color:#00DCE6;
          .num {
            font-size: 23px;
            font-weight: 600;
            margin-right: 5px;
          }
        }
      }
    }
  }
</style>
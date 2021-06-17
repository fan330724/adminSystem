<template>
  <div class="list flex-around">

    <div class="item flex-1" v-for="(item,index) in list" :key="index">
      <dv-border-box-10>
        <div class="flex-dir-column flex-center ">
          <p class="title">{{item.name}}</p>
          <p class="time-part"><span class="time">{{item.time}}</span> <span class="sign">小时</span></p>
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        list:[
          {name:'今日停车总时长',time:'22513'},
          {name:'昨日停车总时长',time:'21595'},
          {name:'日增长率(与昨日比)',time:'22513'}
        ]
      }
    }
  }
</script>

<style lang='scss' scoped>

  .list {
    flex:1 1 auto;
  }
  .item {
    margin-right:3%;
    .title {
      font-size: 12px;
      font-weight: 600;
    }
    .time-part {
      margin-top:15px;
      font-weight: 600;
      .time {
        font-size: 18px;
      }
      .sign {
        font-size: 11px;
        color:#00AAF5;
      }
      
      
    }
    &:nth-of-type(1){
      .time {
        color:#CF443D;
      }
    }
    &:nth-of-type(2){
      .time {
        color:#FFA400;
      }
    }
    &:nth-of-type(3){
      margin-right: 0;
      .time {
        color:#00D9E6;
      }
    }
    
  }
</style>
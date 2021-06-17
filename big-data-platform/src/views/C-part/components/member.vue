<template>
  <div class="flex flex-dir-row list">
    <div class="flex-center flex-dir-column item" v-for="(item,index) in list" :key="index">
      <div class="flex-between flex-dir-row content">
        <span class="title">{{item.name}}</span>
       <span class="num" :style="{'color':color[index]}">{{info[item.key]}}</span>
      </div>
      <svg class="line">
        <circle cx="20%" cy="35%" r="3.5%" stroke="#FFA000" stroke-width="1" fill="none"/>
        <circle cx="20%" cy="35%" r="1.8%" stroke="#FFA000" stroke-width="1" fill="#FFA000"/>
        <line x1="23%" y1="30%" x2="60%" y2="30%" style="stroke: #00E1FF;stroke-width: 2;"></line>
        <line x1="60%" y1="30%" x2="65%" y2="100%" style="stroke: #00E1FF;stroke-width: 2;"></line>
        <line x1="65%" y1="100%" x2="100%" y2="100%" style="stroke: #00E1FF;stroke-width: 2;"></line>
      </svg>
    </div>
  </div>
</template>

<script>
  import { MemberData } from "@/api/c-part"
  export default {
    data(){
      return {
        color:["#FFCD43", "#8753BA", "#1AA15F", "#22A6F2","#00CED9", "#C84638"],
        list:[
          {
            name:'PLUS年卡会员',
            key:'yearMember',
            value:344
          },
          {
            name:'PLUS月卡会员',
            key:'monthMember',
            value:148
          },
          {
            name:'储蓄会员',
            key:'storedMember',
            value:127
          }
        ],
        info:{
          yearMember:0,
          monthMember:0,
          storedMember:0
        }
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
        MemberData().then(res=>{
          if(res && res.data){
            this.info = res.data;
          }else{
            this.info={
              yearMember:0,
              monthMember:0,
              storedMember:0
            };
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  .list {
    flex-wrap: wrap;
    padding-left:2%;
    .item {
      width:45%;
      margin-right:2%;
      padding:25px 0;
      position: relative;
      .num {
        font-size: 25px;
        position: relative;
        top:15px;
        color:#C7463C;
      }
      .content {
        width: 100%;
      }
      .title {
        font-size: 15px;
        font-weight: 600;
        margin-right:15px;
        position: relative;
        left:15px;
      }
      
      .line {
        width:100%;
        height:22px;
        margin-top:5px;
      }
    }
  }
</style>
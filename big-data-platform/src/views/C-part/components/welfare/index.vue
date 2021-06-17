<template>
  <div class="flex-between flex-dir-row container">
    <div class="ladder-part">
      <ladder-comp></ladder-comp>
    </div>
    
    <div class="flex-around flex-dir-column data-part">
      <p class="item" v-for="(item,index) in list" :key="index">
        <span class="title">{{item.name}}</span>
        <span class="num-area"><span class="num">{{info[item.key]}}</span>{{item.unit}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import ladderComp from "./components/ladder"
import { getUserMoney } from "@/api/c-part"

  export default {
    components:{
      ladderComp
    },
    data(){
      return {
        info:{},
        list:[
          {
            name:'福利用户',
            key:'welfareUser',
            unit:'人'
          },
          {
            name:'停车红包',
            key:'redPacketMoney',
            unit:'元'
          },
          {
            name:'加油优惠券',
            key:'comeOnMoney',
            unit:'元'
          },
          {
            name:'洗车优惠券',
            key:'washMoney',
            unit:'元'
          },
          
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
        getUserMoney().then(res=>{
          console.log(res)
          if(res && res.data){
            this.info = res.data;
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  .container {
    align-items: stretch;
  }
  .ladder-part {
    flex:0 0 55%;
  }
  .data-part {
    flex:1 1 auto;
    padding:4% 15px 4% 0;
    align-items: flex-end;
    .item {
      padding:10px 10px 10px 0;
      background: linear-gradient(to right, #090F5B 0%,#063990 100%);
      .num-area {
        font-weight: 600;
        .num {
          font-size: 17px;
        }
      }
      &:nth-last-of-type(1){
          .num-area {
            color:#22A6F2;
          }
        }
        &:nth-last-of-type(2){
          .num-area {
            color:#1AA15F;
          }
        }
        &:nth-last-of-type(3){
          .num-area {
            color:#8753BA;
          }
        }
        &:nth-last-of-type(4){
          .num-area {
            color:#FFCD43;
          }
        }
      .title {
        margin-right: 10px;
        font-size: 13px;
      }   
    }
  }
</style>
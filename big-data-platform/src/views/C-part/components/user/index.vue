<template>
  <div class="container">

    <pie-comp class="pie-comp" :cdata="cdata"></pie-comp>

    <div class="flex-center flex-dir-row plus-part">

      <div class="left">
        <p class="title">plus年卡会员</p>
        <p class="num">{{info.yearMember}}</p>
      </div>

      <div>
        <p class="title">plus月卡会员</p>
        <p class="num">{{info.monthMember}}</p>
      </div>

    </div>

    <div class="flex-around flex-dir-row type-part">
      <p class="item">
        <span class="title">加油用户</span>
        <span class="num">{{info.comeOnUser}}</span>
      </p>
      <p class="item">
        <span class="title">普通用户</span>
        <span class="num">{{info.regularMember}}</span>
      </p>
      <p class="item">
        <span class="title">洗车用户</span>
        <span class="num">{{info.washUser}}</span>
      </p>
    </div>

  </div>
</template>

<script>

  import pieComp from "./components/pie";
  import { getUserCount } from "@/api/c-part"

  export default {
    components:{
      pieComp
    },
    data(){
      return {
        info:{
          yearMember:0,
          monthMember:0,
          comeOnUser:0,
          regularMember:0,
          washUser:0
        },
        cdata:{
          total:100,
          part:0,
          plat:0
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
        getUserCount().then(res=>{
          console.log(res)
          if(res && res.data){
            this.info = res.data;
            this.cdata = {
              total:res.data.stopUser,
              part:res.data.total
            }
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  .container {
    margin-bottom:20px;
  }
  .pie-comp {
    margin: 25px 0 0;
  }
  .plus-part {
    div {
      text-align: center;
      .title {
        font-size: 15px;
        line-height: 150%;
        background-image:-webkit-linear-gradient(bottom,#00E9FF,#fff);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }
      .num {
        font-size: 38px;
        line-height: 170%;
        text-shadow: 1px 1px 3px #11C9E8,1px 1px 6px #11C9E8,1px 1px 9px #11C9E8,1px 1px 12px #11C9E8;
        font-weight: 600;
        color:#fff;
      }
      &.left {
        margin-right:20px;
      }
    }
  }

  .type-part {
    .item {  
      .title {
        font-weight: 500;
        vertical-align: middle;
        margin-right: 5px;
      }
      .num {
        vertical-align: middle;
        font-size: 22px;
        line-height: 100%;
        text-shadow: 1px 1px 5px #00DAFF;
        color:#00DAFF;
      }
    }
  }
</style>
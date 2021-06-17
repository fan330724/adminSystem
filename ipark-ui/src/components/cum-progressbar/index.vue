<template>
  <div class="bar">
    <div class="content" :style="{'width':curWidth+'%','background-color':color,color:color,height:height+'px'}">
      <span class="left-part" :class="{'hide':!width}" :style="{'background-color':color,width:height+'px'}"></span>
      <span class="txt">{{width+'%'}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    height:{
      default:7,
      type:Number
    },
    width:{
      default:0,
      type:Number
    },
    color:{
      default:'#4FBCFF',
      type:String
    }
  },
  computed:{
    curWidth(){
      let result = 0;
      
      if(this.width>100){
        result = 100
      }else if(this.width < 0){
        result = 0
      }else{
        result = this.width;
      };
      console.log(result)
      return result;
    }
  }
}
</script>

<style lang="scss" scoped>
  .bar {
    position: relative;
    background-color: transparent;
    .content {
      position: absolute;
      bottom: 0;
      left:0;
      .left-part {
        position: absolute;
        display: inline-block;
        width:4px;
        height:20px;
        bottom: 0;
        right:0;
        &.hide {
          display: none;
        }
      }
      .txt {
        position: absolute;
        right:-6px;
        transform: translateX(100%);
        top:-20px;
        font-size: 15px;
      }
    }
  }
</style>

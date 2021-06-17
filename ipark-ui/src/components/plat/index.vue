<template>
  <div class="plat-container">
    <el-input v-model="input" placeholder="请输入车牌号" @input="rulePlat">
      <div class="province" slot="prepend" @click="showProvincePart">{{province}}</div>
    </el-input>
    <div class="choice-province-part" v-if="provinceSign">
      <span class="item" v-for="(item,index) in provinceList" :key="index" @click="choiceProvince(item)">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:['value','scope'],
  data(){
    return {
      province:'晋',
      input:'',
      provinceSign:false,
      provinceList:new Array("晋","京","沪","浙","苏","粤","鲁","冀",
        "豫","川","渝","辽","吉","黑","皖","鄂",
        "津","贵","云","桂","琼","青","新","藏",
        "蒙","宁","甘","陕","闽","赣","湘","使","领")
    }
  },
  watch:{
    value:{
      handler(newName, oldName) {
        if(!newName){
          return
        }
    　　let reg= /^[\u4E00-\u9FA5]{1}/;
        let sign = this.provinceList.indexOf(newName.slice(0,1))>-1;
        if(reg.test(newName) && sign){
          this.province = newName.slice(0,1);
          this.input = newName.slice(1);
        }else{
          this.input = newName;
        }
      },
  　　immediate: true
    }
  },
  methods:{
    choiceProvince(item){
      this.province = item;
      this.provinceSign = false;
      this.$emit('input',this.province+this.input);
      if(this.input){
        this.dispatch('ElFormItem', 'el.form.blur', [this.province+this.input]);
      }
    },
    showProvincePart(){
      this.provinceSign = !this.provinceSign
    },
    rulePlat(){
      this.input = this.input.toUpperCase();
      this.$emit('input',this.province+this.input);
    },
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
        name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },

    reset(){
      this.province = '晋';
      this.input = '';
    }
  }
}
</script>

<style lang="scss">
.plat-container {
  position: relative;
  .el-input-group__prepend {
    padding:0;
  }
}
  
</style>

<style lang="scss" scoped>
  .province {
    width: 40px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    color:#000;
    cursor: pointer;
  }
  .choice-province-part{
    background-color: #F5F7FA;
    padding:10px;
    border-radius: 3px;
    position: absolute;
    bottom: -3px;
    transform: translateY(100%);
    z-index: 1;
    border:1px solid #f0f0f0;
    .item {
      box-sizing: border-box;
      display: inline-block;
      line-height: 14px;
      border:1px solid #ccc;
      background-color: #fff;
      border-radius: 3px;
      padding:8px;
      margin:3px;
      cursor: pointer;
      &:hover {
        color:#03A9F4;
        border-color: #03A9F4;
      }
    }
  }
</style>
<template>
  <el-dialog
    title="管理通行车辆"
    :visible.sync="sign"
    width="30%"
    :before-close="handleClose"
  >
    <div class="part">
      <div class="title">岗亭通行模式：</div>
      <el-radio-group v-model="currentModel">
        <el-radio v-for="(item,index) in modelList" :label="item.value" :key="index" border @change="changeModel">{{item.label}}</el-radio>
      </el-radio-group>
    </div>

    <div class="part mang-sentry-part" v-if="currentModel === 'S' || currentModel === 'D'">
      <div class="title">允许从该岗亭进出的车辆：</div>
      <el-checkbox-group v-model="carRelevance">
        <el-checkbox v-for="(item,index) in carTypeList" :label="item.id" :key="index" border :class="{'marginTL':item.name === '临时车'}" style="min-width:100px">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import state from "../state.js";
import {mapGetters} from 'vuex'
import { putObj, getCarTypeBySentry } from '@/api/park/sentry'
export default {
  data() {
    return {
      currentModel:'',
      carRelevance:[],
      modelList:[
        {label:'收费模式',value:'S'},
        // {label:'仅固定车模式',value:'G'},
        {label:'通道模式',value:'D'},
      ]
    };
  },
  computed: {
    ...mapGetters(['carTypeList']),
    sign() {
      return state.carMangSign;
    },
    
  },
  watch: {
    sign(newV, oldV) {
      if (newV) {
        this.currentModel = state.item.currentModel ||'S';
        this.getCarTypeBySentry();
      }
    }
  },
  methods: {
    /**
     * 获取岗亭可通过车辆类型
     */
    getCarTypeBySentry(){
      getCarTypeBySentry({gateId:state.item.id}).then(res=>{
        let list = res.data.data;
        if(list && list.length > 0){
          this.carRelevance = list.map(i=>{
            return i.carTypeId
          });
        }else{
           this.carRelevance = [];
        }
      })
    },
    handleClose() {
      state.carMangSign = false;
    },
    changeModel(){
      this.carRelevance = [];
    },
    save() {
      let temp = JSON.parse(JSON.stringify(state.item));
      temp.carRelevance = this.carRelevance.join(); // 车辆类型
      temp.currentModel = this.currentModel;
      putObj(temp)
        .then((res) => {
          this.$message({
            message: "更新成功",
            type: "success",
          });
          state.carMangSign = false;
          this.$emit("fresh");
        })
        .catch((err) => {
          this.$message({
            message: "更新失败",
            type: "error",
          });
        });
    }
  },
};
</script>

<style lang="scss">
  .mang-sentry-part {
    .el-checkbox.is-bordered {
      width:120px;
      margin:0 20px 15px 0 !important;

    }
  }

</style>

<style lang="scss" scoped>
  .part {
    padding-bottom: 15px;
  }
  .title {
    padding-bottom:15px;
    font-size: 15px;
    font-weight: 500;
  }
  .check-row {
    line-height: 25px;
  }
  .marginTL{
    margin: 8px 0 0 !important;
  }
</style>
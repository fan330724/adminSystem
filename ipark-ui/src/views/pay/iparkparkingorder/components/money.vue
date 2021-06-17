<template>
  <el-dialog
    :title="title"
    :visible.sync="sign"
    width="30%"
    :before-close="handleClose"
    append-to-body
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      v-if="status === 'showMoney' || status === 'showOut'"
    >
      <el-form-item label="车牌号">
        <div>{{ form.plate_number }}</div>
      </el-form-item>
      <el-form-item label="车辆类型">
        <div>{{ form.typeName }}</div>
      </el-form-item>
      <el-form-item label="入场时间">
        <div>{{ form.in_time }}</div>
      </el-form-item>
      <el-form-item label="入场岗亭">
        <div>{{ form.entry_gate_name }}</div>
      </el-form-item>
      <el-form-item label="出场时间">
        <div>{{ form.out_time }}</div>
      </el-form-item>
      <el-form-item label="出场岗亭">
        <div>{{ form.out_gate_name }}</div>
      </el-form-item>
      <el-form-item label="停车时长">
        <div>{{ form.Duration }}</div>
      </el-form-item>
      <el-form-item label="应收金额" v-if="status === 'showMoney'">
        <div>{{ form.total }}</div>
      </el-form-item>
      <el-form-item label="减免金额">
        <div>{{ form.dearte_total }}</div>
      </el-form-item>
      <el-form-item label="优惠方式">
        <div>{{ form.coupon_type }}</div>
      </el-form-item>
      <el-form-item label="优惠长度">
        <div>{{ form.coupon_length }}</div>
      </el-form-item>
      <el-form-item label="实收金额" v-if="status === 'showMoney'">
        <div>{{ form.total }}</div>
      </el-form-item>
      <el-form-item label="支付方式" v-if="status === 'showMoney'">
        <div>现金</div>
      </el-form-item>

      <el-form-item label="备注" prop="reason" v-show="status === 'showOut'">
        <el-select v-model="form.reason" placeholder="请选择原因">
          <el-option label="设备维修工" value="设备维修工"></el-option>
          <el-option label="病患车辆" value="病患车辆"></el-option>
          <el-option label="来访车辆" value="来访车辆"></el-option>
          <el-option label="内部车辆" value="内部车辆"></el-option>
          <el-option label="其它" value="其它"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="计费规则" prop="PRICE_TEM_ID" v-if="status === 'showOut' && form.reason === '病患车辆'">
        <el-select v-model="form.PRICE_TEM_ID" placeholder="请选择计费规则">
          <el-option v-for="(item,index) in costList" :key="index" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="reasonInput" v-if="status === 'showOut' && form.reason === '其它'">
        <el-input
          type="textarea"
          autosize
          v-model="form.reasonInput"
          placeholder="请输入原因"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel" v-if="status === 'addblack'">取 消</el-button>
      <el-button type="primary" @click="beforeSave">确 定</el-button>
    </span>

  </el-dialog>

</template>

<script>
import state from "../state";
import { mapGetters } from "vuex";
import { editStatus } from "@/api/pay/iparkparkingorder";
import { fetchPage } from '@/api/park/cost'
export default {
  name: "money",
  data() {
    return {
      form: {},
      costList:[],
      rules: {
        reason: [
          { required: true, message: "请选择原因", trigger: "change" }],
        reasonInput: [
          { required: true, message: "请输入原因", trigger: "blur" },
        ],
        'PRICE_TEM_ID':[
          { required: true, message: "请选择计费规则", trigger: "change" }
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["parkInfo"]),
    sign() {
      return state.addSign;
    },
    status() {
      return state.editStatus;
    },
    title() {
      let result = "现金收款";
      if (state.editStatus === "showOut") {
        result = "手动抬杠";
      }
      return result;
    },
  },
  mounted(){
    this.getList();
  },
  watch: {
    sign(newV, oldV) {
      if (newV) {
        console.log(state.item,'state.item')
        this.form = JSON.parse(JSON.stringify(state.item));
      } else {
        this.$refs["form"].resetFields();
      }
    },
  },
  methods: {
    //获取当前列表
    getList() {
      fetchPage().then(response => {
        let temp = response.data.data;
        let result = [];
        if(temp.length>0){
          temp.map((i,index)=>{
            let obj = {};
            if(i.list && i.list.length>0){
              obj.label = i.carTypeName;
              let cost= i.list.filter((j)=>{return j.status === 'Y'});
              if(cost && cost.length>0){
                obj.id = cost[0].id;
                result.push(obj);
              }
            }
          })
        }
        this.costList = result;
        console.log(this.costList,'this.costList')
      }).catch(err=>{
        this.costList = [];
      })
    },
    cancel() {
      state.addSign = false;
    },
    handleClose() {
      state.addSign = false;
    },
    beforeSave() {
      if (this.status === "showMoney") {
        this.showMoney();
      } else if (this.status === "showOut") {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.showOut();
          } else {
            return false;
          }
        });
      }
    },

    /**
     * 现金收款
     */
    showMoney() {
      console.log(this.form);
      editStatus({
        PARK_ID: this.parkInfo.id,
        CAMERA_ID: this.form.out_gate_id,
        TYPE: 1,
      }).then((res) => {
        // console.log(res);
        if (res.data.errcode == 0) {
          this.$emit("refresh");
          this.handleClose();
          this.$message({
            type: "success",
            message: "出场成功",
          });
        } else {
          this.$message({
            type: "error",
            message: res.data.errmsg,
          });
        }
      });
    },
    /**
     * 手动抬杠
     */
    showOut() {
      console.log(this.form);
      var reason = ""
      if(this.form.reason == '其它' && this.form.reasonInput){
        reason = this.form.reasonInput
      }else{
        reason = this.form.reason
      }
      let params = {
        PARK_ID: this.parkInfo.id,
        CAMERA_ID: this.form.out_gate_id,
        REASON: reason,
        TYPE: 2,
      };
      if(this.form.reason === '病患车辆'){
        params.TYPE = 3;
        params.PRICE_TEM_ID = this.form.PRICE_TEM_ID;
      }
      editStatus(params).then((res) => {
        // console.log(res);
        if (res.data.errcode == 0) {
          this.$emit("refresh");
          this.handleClose();
          this.$message({
            type: "success",
            message: "出场成功",
          });
        } else {
          this.$message({
            type: "error",
            message: res.data.errmsg,
          });
        }
      });
    },
  },
};
</script>

<style>
</style>
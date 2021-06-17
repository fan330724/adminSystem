<template>
  <el-dialog
    :title="title"
    :visible.sync="sign"
    width="40%"
    :before-close="handleClose"
    append-to-body
    top="10vh"
  >
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="车牌号">
        <div>{{ form.plate_number }}</div>
      </el-form-item>
      <el-form-item label="车辆类型">
        <div>{{ form.typeName }}</div>
      </el-form-item>
      <el-form-item label="入场时间">
        <div>{{ form.in_time }}</div>
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
      <el-form-item label="应付金额">
        <div>{{ form.money }}</div>
      </el-form-item>
      <el-form-item label="减免金额">
        <div>{{ form.dearte_total }}</div>
      </el-form-item>
      <el-form-item label="实付金额" prop="total">
        <el-input
          v-model="form.total"
          :value="form.total"
          placeholder="请输入内容"
          v-if="status == 'showHandle'"
        ></el-input>
        <div v-else>{{ form.total }}</div>
      </el-form-item>
      <el-form-item label="支付方式">
        <el-select
          v-model="form.pay_type_code"
          :value="form.pay_type_code"
          placeholder="请选择支付方式"
          v-if="status == 'showHandle'"
        >
          <!-- <el-option label="支付宝" value="alipay"></el-option> -->
          <el-option label="微信小程序" value="wxxpay"></el-option>
          <el-option label="现金" value="XIANJIN"></el-option>
        </el-select>
        <div v-else>{{ form.pay_type_code }}</div>
      </el-form-item>
      <el-form-item label="岗亭负责人">
        <div>{{ form.outPeopleName }}</div>
      </el-form-item>
      <el-form-item label="支付状态">
        <div>{{ form.order_status }}</div>
      </el-form-item>
      <el-form-item label="备注">
        <textarea
          name=""
          id=""
          cols="30"
          rows="3"
          v-if="status == 'showHandle'"
          placeholder="请输入备注"
          style="padding: 5px"
          v-model="form.remark"
        ></textarea>
        <div v-else>{{ form.remark }}</div>
      </el-form-item>
      <el-form-item label="对账失败原因" v-if="status === 'showLook'">
        <div>{{ form.exist_reason }}</div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" v-if="status === 'showHandle'">
      <el-button type="primary" @click="beforeSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import state from "../../state";
import { mapGetters } from "vuex";
import { editObj } from "@/api/pay/financeCheck";
export default {
  name: "money",
  data() {
    let reg = /^[+-]?\d+(\.\d+)?$/;
    var validatorTotal = (rule, value, callback) => {
      if (!reg.test(value)) {
        callback(new Error("请输入数字"));
      } else {
        if (value > this.form.money) {
          callback(new Error("金额不能大于应付金额"));
        } else if (value < 0) {
          callback(new Error("金额不能小于0"));
        } else {
          callback();
        }
      }
    };
    return {
      form: {},
      rules: {
        total: [
          { required: false, message: "金额不能为空" },
          { validator: validatorTotal, trigger: "blur" },
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
      let result = "查看订单";
      if (state.editStatus === "showHandle") {
        result = "订单明细";
      }
      return result;
    },
  },
  watch: {
    sign(newV, oldV) {
      if (newV) {
        this.form = JSON.parse(JSON.stringify(state.item));
      } else {
        this.$refs["form"].resetFields();
      }
    },
  },
  methods: {
    cancel() {
      state.addSign = false;
    },
    handleClose() {
      state.addSign = false;
    },
    beforeSave() {
      // console.log(this.form);
      if (this.status === "showHandle") {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.editObj(this.form);
          } else {
            return false;
          }
        });
      }
    },

    editObj(form) {
      this.$confirm("处理后不可恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          editObj({
            id: form.id,
            payTypeCode: form.pay_type_code,
            total: form.total,
            dearteTotal: form.money - form.total,
            remark: form.remark,
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "处理成功",
              });
              this.$emit("refresh");
              this.handleClose();
            } else {
              this.$message({
                type: "error",
                message: "处理失败",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消处理",
          });
        });
    },
  },
};
</script>

<style>
</style>
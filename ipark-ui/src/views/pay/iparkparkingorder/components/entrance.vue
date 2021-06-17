<template>
  <el-dialog
    :title="title"
    :visible.sync="sign"
    width="30%"
    :before-close="handleClose"
    append-to-body
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="车牌号" prop="plate_number">
        <plat-comp v-model="form.plate_number" ref="plat"></plat-comp>
      </el-form-item>
      <el-form-item label="入场时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.date2"
              style="width: 100%"
              value-format="HH:mm:ss"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="入场岗亭" prop="reason" class="marginTop">
        <el-select v-model="form.reason" placeholder="请选择岗亭">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="beforeSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import state from "../state";
import { mapGetters } from "vuex";
import { getToList, gatecarparking } from "@/api/pay/iparkparkingorder";
import platComp from "@/components/plat/index";
import {rule} from '@/util/validateRules'
export default {
  name: "money",
  components: {
    platComp,
  },
  data() {
    return {
      form: {
        date1: "",
        date2: "",
      },
      title: "手工入场",
      options: [],
      rules: {
        plate_number: [
          { required: true, message: "请输入车牌号", trigger: "blur" },
          { validator: rule.validPlatNumber, trigger: "blur" },
        ],
        date1: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        reason: [{ required: true, message: "请选择岗亭", trigger: "change" }],
      },
    };
  },
  created() {
    getToList(this.parkInfo.id, "gate").then((res) => {
      // console.log(res);
      this.options = res.data.data;
    });
    this.setDefaiultTime();
  },
  computed: {
    ...mapGetters(["parkInfo"]),
    sign() {
      return state.entrance;
    },
  },
  methods: {
    handleClose() {
      state.entrance = false;
      this.$refs["form"].resetFields();
      this.$refs["plat"].reset();
    },
    beforeSave() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          gatecarparking("post", {
            entryGateId: this.form.reason,
            inTime: this.form.date1 + " " + this.form.date2,
            parkCode: this.parkInfo.code,
            plateNumber: this.form.plate_number,
          }).then((res) => {
            if (res.data.code == 0) {
              this.$emit("refresh");
              this.handleClose();
              this.$message({
                type: "success",
                message: res.data.data,
              });
              this.$refs["form"].resetFields();
              this.setDefaiultTime();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
          });
        } else {
          return false;
        }
      });
    },

    /**
     * 设置默认时间
     */
    setDefaiultTime() {
      var date = new Date(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      var h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      var f =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      this.form.date1 = Y + M + D;
      this.form.date2 = h + f + s;
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
.marginTop {
  margin-top: -20px !important;
}
</style>
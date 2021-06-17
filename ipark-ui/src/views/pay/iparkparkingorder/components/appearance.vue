<template>
  <el-dialog
    :title="title"
    :visible.sync="sign"
    width="30%"
    :before-close="handleClose"
    append-to-body
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="车牌号">
        <div>{{form.plate_number}}</div>
      </el-form-item>
      <el-form-item label="出场岗亭" prop="reason">
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
import { getToList, getCameraByGateId, carcache} from "@/api/pay/iparkparkingorder";
export default {
  name: "money",
  data() {
    return {
      form: {},
      title: "计费",
      options: [],
      rules: {
        reason: [{ required: true, message: "请选择岗亭", trigger: "change" }],
      },
    };
  },
  created() {
    getToList(this.parkInfo.id, "gate").then((res) => {
      // console.log(res);
      this.options = res.data.data;
    });
  },
  computed: {
    ...mapGetters(["parkInfo"]),
    sign() {
      return state.appearance;
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
      state.appearance = false;
    },
    handleClose() {
      state.appearance = false;
    },
    beforeSave() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          getCameraByGateId(this.form.reason).then(res => {
            let {id,parkId} = res.data.data
            carcache({
              PARK_ID: parkId,
              CAMERA_ID: id,
              PLATE_NUMBER: this.form.plate_number
            }).then(res => {
              if(res.data.errcode != 0){
                this.$message.error('操作失败');
              }else{
                this.$message.success('操作成功');
                this.$emit("refresh");
                this.handleClose()
              }
            })
          })
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
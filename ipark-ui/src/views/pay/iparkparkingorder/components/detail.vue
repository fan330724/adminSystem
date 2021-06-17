<template>
  <el-dialog
    :visible.sync="sign"
    width="70%"
    :before-close="handleClose"
    top="10vh"
    append-to-body
  >
    <div class="content elButtonStyle">
      <div class="list">
        <div class="title">
          <span></span>
          基本信息
        </div>
        <table border="1">
          <tr>
            <td>车牌号</td>
            <td v-if="list.status == '待出场'">
              <div class="flex">
                <span v-if="Showstatus">{{ list.plate_number }}</span>
                <el-input
                  v-model="newPlateNumber"
                  clearable
                  ref="mark"
                  maxlength="8"
                  show-word-limit
                  v-else
                  class="inp"
                ></el-input>
                <div class="btn">
                  <el-button
                    @click="editPlateNumber"
                    v-if="list.status == '待出场' && Showstatus"
                    type="primary"
                    size="small"
                    >修改</el-button
                  >
                  <el-button
                    @click="editbutton"
                    v-if="!Showstatus"
                    type="primary"
                    size="small"
                    >确认</el-button
                  >
                </div>
              </div>
            </td>
            <td v-else class="fontSize">{{ list.plate_number }}</td>
            <td>车辆类型</td>
            <td>{{ list.typeName }}</td>
          </tr>
          <tr>
            <td>汽车品牌</td>
            <td>{{ list.name }}</td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="list">
        <div class="title">
          <span></span>
          进出场信息
        </div>
        <table border="1">
          <tr>
            <td>入场岗亭</td>
            <td>{{ list.entry_gate_name }}</td>
            <td>出场岗亭</td>
            <td>{{ list.out_gate_name }}</td>
          </tr>
          <tr>
            <td>入场时间</td>
            <td>{{ list.in_time }}</td>
            <td>出场时间</td>
            <td>{{ list.out_time }}</td>
          </tr>
          <tr>
            <td>入场岗亭负责人</td>
            <td>{{ list.inPeopleName }}</td>
            <td>出场岗亭负责人</td>
            <td>{{ list.outPeopleName }}</td>
          </tr>
          <tr>
            <td>停车时长</td>
            <td>{{ list.Duration }}</td>
            <td>是否手动抬杠</td>
            <td>{{ list.artificial }}</td>
          </tr>
        </table>
      </div>
      <div class="list">
        <div class="title">
          <span></span>
          收费信息
        </div>
        <table border="1">
          <tr>
            <td>支付方式</td>
            <td>{{ list.pay_type_code }}</td>
            <td>减免金额</td>
            <td>{{ list.dearte_total }}</td>
          </tr>
          <tr>
            <td>优惠方式</td>
            <td>{{ list.coupon_type }}</td>
            <td>优惠长度</td>
            <td>{{ list.coupon_length }}</td>
          </tr>
          <tr>
            <td>应付金额</td>
            <td>{{ list.money }}</td>
            <td>备注</td>
            <td>{{ list.remark }}</td>
          </tr>
          <tr>
            <td>实付金额</td>
            <td>{{ list.total }}</td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="list">
        <div class="title">
          <span></span>
          影像信息
        </div>
        <div class="img">
          <div class="inOut">
            <!-- <h4>入场图片</h4> -->
            <img
              :src="
                'https://api.weiwopark.com/hdfs/ipark/imagesource/queryPutIn?parkInPicScene=' +
                list.park_in_pic_scene
              "
              alt=""
              v-if="
                list.park_in_pic_scene &&
                list.hasOwnProperty('park_in_pic_scene')
              "
            />
            <div class="error" v-else>
              <img src="/img/error.svg" alt="" class="error" />
            </div>
          </div>
          <!-- <div class="inOut">
            <h4>出场图片</h4>
            <img
              :src="'https://api.weiwopark.com/hdfs/ipark/imagesource/queryPutIn?parkInPicScene=' + list.park_out_pic_scene"
              alt=""
              v-if="list.park_out_pic_scene"
            />
            <div class="error" v-else>
              <img src="/img/error.svg" alt="" class="error" />
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import state from "../state";
import { mapGetters } from "vuex";
import { gatecarparking } from "@/api/pay/iparkparkingorder";
export default {
  name: "detail",
  computed: {
    ...mapGetters(["parkInfo"]),
    sign() {
      return state.lookDetail;
    },
  },
  data() {
    return {
      list: {},
      newPlateNumber: "",
      Showstatus: true,
    };
  },
  watch: {
    sign(newV, oldV) {
      if (newV) {
        this.list = JSON.parse(JSON.stringify(state.item));
        this.newPlateNumber = this.list.plate_number;
      } else {
        this.list = {};
      }
    },
  },
  methods: {
    handleClose() {
      state.lookDetail = false;
      this.Showstatus = true;
    },
    editPlateNumber() {
      this.Showstatus = !this.Showstatus;
      this.$nextTick(() => {
        this.$refs["mark"].focus();
      });
    },
    editbutton() {
      if (this.list.plate_number == this.newPlateNumber) {
        this.Showstatus = !this.Showstatus;
      } else if (!this.newPlateNumber) {
        this.$message.error("请输入车牌号");
      } else {
        gatecarparking("put", {
          id: this.list.id,
          parkId: this.parkInfo.id,
          parkCode: this.parkInfo.code,
          plateNumber: this.list.plate_number + "-" + this.newPlateNumber,
        }).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "恭喜你，修改成功",
              type: "success",
            });
            this.Showstatus = !this.Showstatus;
            this.list.plate_number = this.newPlateNumber;
            this.$emit("refresh");
          } else {
            this.$message.error("修改失败");
          }
        });
      }
    },
  },
};
</script>
<style lang="scss">
.elButtonStyle .el-button--small,.el-button--small.is-round {
  padding: 9px 15px !important;
}
.elButtonStyle .el-button--mini,.el-button--small {
    font-size: 12px !important;
}
</style>
<style lang="scss" scoped>
.content {
  // border: 1px solid #ccc;
  // padding: 0 10px;
  margin-top: -55px;
  .list {
    padding: 10px 0;
    .title {
      padding: 10px 0;
      display: flex;
      align-items: center;
      span {
        display: block;
        padding: 10px 2px;
        width: 3px;
        background: #409eff;
        margin-right: 10px;
      }
    }
    table {
      text-align: center;
      width: 100%;
      height: 100%;
      tr {
        td {
          padding: 10px 5px;
          font-size: 14px;
          width: 32%;
          position: relative;
          .flex {
            // display: flex;
            // justify-content: space-around;
            // align-items: center;
            text-align: center;
            width: 100%;
            span {
              font-size: 18px;
            }
            .inp {
              width: 65%;
            }
            .btn {
              position: absolute;
              right: 10px;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
        td:nth-of-type(odd) {
          // background: #409EFF;
          width: 20%;
        }
        .fontSize{
          font-size: 18px;
        }
      }
    }
    .img {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .inOut {
        img {
          margin-top: 10px;
        }
        .error {
          width: 500px;
          height: 300px;
        }
      }

      // img {
      //   width: 100%;
      //   height: 92%;
      //   border: none;
      // }
    }
  }
}
</style>
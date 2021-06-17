<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :search.sync="searchBox"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @search-change="searchChange"
        @cell-click="look1"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @search-reset="searchReset"
      >
        <template slot-scope="scope" slot="menu">
          <el-button
            type="text"
            size="small"
            @click.native="showMoney(scope.row, scope.index)"
            v-if="
              permissionList.cashBtn &&
              scope.row.status === '待出场' &&
              scope.row.exist != '扫码录入' &&
              scope.row.exist_advance_pay != 'Y'
            "
            >现金收款</el-button
          >
          <el-button
            type="text"
            size="small"
            @click.native="showOut(scope.row, scope.index)"
            v-if="
              permissionList.barBtn &&
              scope.row.status === '待出场' &&
              scope.row.exist != '扫码录入' &&
              scope.row.exist_advance_pay != 'Y'
            "
            >手动抬杠</el-button
          >
          <el-button
            type="text"
            size="small"
            @click.native="look(scope.row, scope.index)"
            v-if="permissionList.viewBtn"
            >查看</el-button
          >
          <el-button
            type="text"
            size="small"
            @click.native="addblack(scope.row, scope.index)"
            v-if="permissionList.addBtn"
            >加入黑名单</el-button
          >
          <el-button
            type="text"
            size="small"
            @click.native="appearance(scope.row, scope.index)"
            v-if="permissionList.appearanceBtn && scope.row.status === '待出场'"
            >计费</el-button
          >
          <el-button
            type="text"
            size="small"
            @click.native="delBtn(scope.row, scope.index)"
            v-if="permissionList.delBtn && scope.row.status === '待出场'"
            >删除</el-button
          >
        </template>
        <template slot-scope="scope" slot="plate_number">
          <span class="plate_number_hover">{{ scope.row.plate_number }}</span>
        </template>
        <template slot-scope="scope" slot="search">
          <!-- 车辆状态 -->
          <div
            class="select el-col el-col-6 el-col-offset-0 el-col-xs-24 el-col-sm-12 el-col-md-6 avue-form__row"
            style="padding-left: 10px; padding-right: 10px"
          >
            <label
              for=""
              class="el-form-item__label"
              style="width: 80px; line-height: 32px"
              >车辆状态:</label
            >
            <div
              class="select-input"
              style="height: 32px; line-height: 32px; margin-left: 80px"
            >
              <el-select v-model="searchBox.status">
                <el-option label="已出场" value="Y"> </el-option>
                <el-option label="待出场" value="N"> </el-option>
              </el-select>
            </div>
          </div>
          <!-- 选择岗亭 -->
          <div
            class="select el-col el-col-6 el-col-offset-0 el-col-xs-24 el-col-sm-12 el-col-md-6 avue-form__row"
            style="padding-left: 10px; padding-right: 10px"
          >
            <label
              for=""
              class="el-form-item__label"
              style="width: 80px; line-height: 32px"
              >选择岗亭:</label
            >
            <div
              class="select-input"
              style="height: 32px; line-height: 32px; margin-left: 80px"
            >
              <el-select
                v-model="searchBox.sentryBox"
                clearable
                placeholder="请选择岗亭"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <!-- 入场时间 -->
          <div
            class="el-col el-col-6 el-col-offset-0 el-col-xs-24 el-col-sm-12 el-col-md-6 avue-form__row"
            style="padding-left: 10px; padding-right: 10px"
          >
            <label
              for=""
              class="el-form-item__label"
              style="width: 80px; line-height: 32px"
              >入场时间:</label
            >
            <div
              class=""
              style="height: 32px; line-height: 32px; margin-left: 80px"
            >
              <el-date-picker
                v-model="searchBox.inTime"
                type="daterange"
                range-separator="——"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
          </div>
          <!-- 出场时间 -->
          <div
            class="el-col el-col-6 el-col-offset-0 el-col-xs-24 el-col-sm-12 el-col-md-6 avue-form__row"
            style="padding-left: 10px; padding-right: 10px"
          >
            <label
              for=""
              class="el-form-item__label"
              style="width: 80px; line-height: 32px"
              >出场时间:</label
            >
            <div
              class=""
              style="height: 32px; line-height: 32px; margin-left: 80px"
            >
              <el-date-picker
                v-model="searchBox.outTime"
                type="daterange"
                range-separator="——"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
          </div>
        </template>

        <template slot="menuLeft">
          <el-button type="primary" size="small" @click="entrance"
            >手工入场</el-button
          >
        </template>
      </avue-crud>
      <money @refresh="refreshChange"></money>
      <detail @refresh="refreshChange"></detail>
      <entrance @refresh="refreshChange" ref="entrance"></entrance>
      <appearance @refresh="refreshChange"></appearance>
    </basic-container>
  </div>
</template>

<script>
import {
  getObj,
  getToList,
  addblack,
  getdetail,
  deleteMsgByEntity,
} from "@/api/pay/iparkparkingorder";
import { tableOption } from "@/const/crud/pay/iparkparkingorder";
import detail from "./components/detail";
import money from "./components/money";
import entrance from "./components/entrance";
import appearance from "./components/appearance";
import { mapGetters } from "vuex";
import state from "./state";

export default {
  name: "iparkparkingorder",
  components: {
    detail,
    money,
    entrance,
    appearance,
  },
  data() {
    return {
      //表格数据
      tableData: [],
      //搜索数据
      searchForm: {
        status: "N",
      },
      searchBox: {
        status: "N",
      },
      options: [],
      //分页
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      tableLoading: false,
      //表格配置
      tableOption: tableOption,
    };
  },
  computed: {
    ...mapGetters(["permissions", "parkInfo"]),
    permissionList() {
      return {
        viewBtn: this.vaildData(
          this.permissions.pay_iparkparkingorder_view,
          false
        ),
        addBtn: this.vaildData(
          this.permissions.pay_iparkparkingorder_add,
          false
        ),
        cashBtn: this.vaildData(
          this.permissions.pay_iparkparkingorder_cash,
          false
        ),
        barBtn: this.vaildData(
          this.permissions.pay_iparkparkingorder_bar,
          false
        ),
        appearanceBtn: this.vaildData(
          this.permissions.pay_iparkparkingorder_appearance,
          false
        ),
        delBtn: this.vaildData(
          this.permissions.pay_iparkparkingorder_del,
          false
        ),
      };
    },
  },
  created() {
    tableOption.column.reduce((e, item, index) => {
      switch (item.label) {
        case "汽车品牌":
          item.dicUrl = `/gate/record/dropDownListBox/${this.parkInfo.id}/brand`;
          break;
        case "车辆类型":
          item.dicUrl = `/gate/record/dropDownListBox/${this.parkInfo.id}/carType`;
          break;
      }
      return;
    }, 0);
    getToList(this.parkInfo.id, "gate").then((res) => {
      this.options = res.data.data;
    });
  },
  mounted() {},
  methods: {
    getList(page, params) {
      this.tableLoading = true;
      let temp = Object.assign(
        {
          current: page.currentPage,
          size: page.pageSize,
        },
        params,
        this.searchForm
      );
      getObj(temp)
        .then((response) => {
          this.tableData = response.data.data.orders;
          this.page.total = response.data.data.total;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    /**
     * 手工入场
     */
    entrance() {
      state.entrance = true;
      this.$refs.entrance.setDefaiultTime();
    },
    /**
     * 计费
     */
    appearance(row) {
      state.appearance = true;
      state.item = row;
    },

    /**
     * 现金收款
     */
    showMoney(row, index) {
      getdetail({
        id: row.id,
      }).then((res) => {
        state.addSign = true;
        state.editStatus = "showMoney";
        state.item = res.data.data[0];
      });
    },

    /**
     * 手动抬杠
     */
    showOut(row, index) {
      getdetail({
        id: row.id,
      }).then((res) => {
        state.addSign = true;
        state.editStatus = "showOut";
        state.item = res.data.data[0];
      });
    },

    /**
     * 查看
     */
    look(row, index) {
      getdetail({
        id: row.id,
      }).then((res) => {
        state.lookDetail = true;
        let status = row.status;
        state.item = { ...res.data.data[0], status };
      });
    },
    /**
     * 删除
     */
    delBtn(row) {
      var _this = this;
      this.$confirm("是否确认删除此条数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        console.log(_this.parkInfo.code);
        deleteMsgByEntity({
          parkCode: _this.parkInfo.code,
          id: row.id,
        }).then((res) => {
          console.log(res);
          if (res.data.code == "0") {
            _this.$message.success("删除成功");
            _this.getList(_this.page);
          } else {
            _this.$message.error("删除失败");
          }
        });
      });
    },
    /**
     * 点击车牌号
     */
    look1(row, item) {
      if (item.label == "车牌号") {
        getdetail({
          id: row.id,
        }).then((res) => {
          state.lookDetail = true;
          let status = row.status;
          state.item = { ...res.data.data[0], status };
        });
      }
    },
    /**
     * 加入黑名单
     */
    addblack(row, index) {
      let message = `确认将(${row.typeName} ${row.plate_number})添加为黑名单车辆?`;
      this.$prompt(message, "加入黑名单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showInput: true,
        type: "warning",
        inputPlaceholder: "请输入原因",
        inputPattern: /\S/,
        inputErrorMessage: "请输入原因",
        center: true,
      }).then((res) => {
        addblack({
          plateNumber: row.plate_number,
          type: row.typeID,
          brandId: row.name,
          remarks: res.value,
        }).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "加入黑名单成功!",
            });
            this.getList(this.page);
          } else {
            this.$message({
              type: "error",
              message: "请勿重复添加！",
            });
          }
        });
      });
    },

    searchChange(form, done) {
      if (form.inTime) {
        var inTime = form.inTime[0],
          inTimes = form.inTime[1];
      }
      if (form.outTime) {
        var outTime = form.outTime[0],
          outTimes = form.outTime[1];
      }
      this.searchForm = {
        inTime: inTime, //入场开始时间
        inTimes: inTimes, //入场结束时间
        outTime: outTime, //出场开始时间
        outTimes: outTimes, //出场结束时间
        plateNumber: form.plate_number, //车牌号
        carBrandId: form.name, //汽车品牌
        exist: form.exist, //车辆识别
        cartype: form.typeName, //车辆类型
        payTypeCode: form.pay_type_code, //支付方式
        status: form.status, //车辆状态
        gateName: form.sentryBox, //岗亭
      };
      this.page.currentPage = 1;
      this.getList(this.page, this.searchForm);
      done();
    },
    refreshChange() {
      this.getList(this.page);
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    searchReset() {
      this.searchForm = {
        status: "N",
      };
      this.searchBox = {
        status: "N",
      };
      this.getList(this.page, this.searchForm);
    },
  },
};
</script>

<style lang="scss" scoped>
.plate_number_hover:hover {
  color: blue;
  font-weight: bold;
  font-size: 18px;
}
.plate_number_hover {
  font-weight: bold;
  font-size: 14px;
}
</style>

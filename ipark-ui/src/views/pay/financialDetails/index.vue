<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :search.sync="sentryBox"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        :cell-style="cellStyle"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @search-reset="searchReset"
        @filter-change="filterChange"
      >
        <template slot="menuLeft">
          <el-button
            type="primary"
            size="small"
            @click="download"
            icon="el-icon-download"
            >导出</el-button
          >
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button
            type="text"
            size="small"
            @click.native="showHandle(scope.row, scope.index)"
            v-if="permissionList.editBtn && scope.row.dispose == '0'"
            >处理</el-button
          >
          <el-button
            type="text"
            size="small"
            @click.native="look(scope.row, scope.index)"
            v-if="permissionList.viewBtn"
            >查看</el-button
          >
        </template>

        <template slot-scope="scope" slot="search">
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
                v-model="sentryBox.outTime"
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
      </avue-crud>
      <operation @refresh="refreshChange"></operation>
    </basic-container>
  </div>
</template>

<script>
import { getObj, downloadData } from "@/api/pay/financialDetails";
import { tableOption } from "@/const/crud/pay/financialDetails";
import operation from "./components/operation";
import { mapGetters } from "vuex";
import state from "./state";

export default {
  name: "gateIncome",
  components: {
    operation,
  },
  data() {
    return {
      //表格数据
      tableData: [],
      //搜索数据
      searchForm: {},
      options: [],
      //表单数据
      sentryBox: {},
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
        viewBtn: this.vaildData(this.permissions.pay_gateIncome_view, false),
        editBtn: this.vaildData(this.permissions.pay_gateIncome_edit, false),
      };
    },
  },
  created() {
    tableOption.column.reduce((e, item, index) => {
      switch (item.label) {
        case "车辆类型":
          item.dicUrl = `/gate/record/dropDownListBox/${this.parkInfo.id}/carType`;
          break;
      }
      return;
    }, 0);
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
        .then((res) => {
          this.tableData = res.data.data.orders;
          this.page.total = res.data.data.total;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },

    /**
     * 处理
     */

    showHandle(row, index) {
      state.addSign = true;
      state.editStatus = "showHandle";
      state.item = row;
    },
    /**
     * 查看
     */
    look(row, index) {
      state.addSign = true;
      state.editStatus = "showLook";
      state.item = row;
    },
    /**
     * 改变行样式
     */
    cellStyle({ row, column, rowIndex }) {
      if (row.exist_record == "Y") {
        return {
          backgroundColor: "#cccccc",
        };
      }
    },
    /**
     * 搜索
     */
    searchChange(form, done) {
      if (form.outTime) {
        var outTime = form.outTime[0],
          outTimes = form.outTime[1];
      }
      this.searchForm = {
        outTime: outTime, //出场开始时间
        outTimes: outTimes, //出场结束时间
        plateNumber: form.plate_number, //车牌号
        cartype: form.typeName, //车辆类型
        payTypeCode: form.pay_type_code, //支付方式
        orderStatus: form.order_status, //支付状态
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
    /**
     * 清空
     */
    searchReset() {
      this.searchForm = {};
      this.getList(this.page, this.searchForm);
    },
    /**
     * 导出表格
     */
    download() {
      downloadData(this.searchForm).then((res) => {
        // ,{type:"application/vnd.ms-excel"}
        let url = window.URL.createObjectURL(new Blob([res.data]));
        this.downloadFun(url);
      });
    },
    downloadFun(blobUrl) {
      const a = document.createElement("a");
      a.download = "财务明细数据表.xlsx";
      a.href = blobUrl;
      a.click();
    },
    /**
     * 筛选条件变更出发
     */
    filterChange(obj){
      console.log(obj,'筛选条件变更')
    }
  },
};
</script>

<style lang="scss">
.avue-form__menu--center {
  text-align: left;
}
.avue-form__menu--center .el-button {
  margin: 0 5px 0 !important;
}
</style>

<style lang="scss" scoped>
    .active{
      background-color: #cccccc !important;
    }
</style>

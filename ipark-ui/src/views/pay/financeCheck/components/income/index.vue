<template>
  <div class="contain">
    <div class="filter-part">
      <div>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOption"
          @change="changeDate"
          :clearable="false"
        >
        </el-date-picker>
        <el-button
          type="primary"
          icon="el-icon-search"
          style="margin-left: 30px"
          size="mini"
          @click="search"
          >搜索</el-button
        >
      </div>
      <div>
        <el-button
          icon="el-icon-refresh"
          circle
          @click="getList"
        ></el-button>
        <!-- <el-button type="primary" icon="el-icon-download" circle></el-button> -->
      </div>
    </div>

    <el-table :data="tableData" size="medium" border style="width: 100%"  v-loading="loading">
      <el-table-column
        fixed
        prop="createDate"
        label="日期"
        align="center"
        min-width="180"
      >
      </el-table-column>
      <el-table-column
        prop="wxpayMoney"
        label="微信支付金额"
        align="center"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        prop="alipayMoney"
        label="支付宝支付金额"
        align="center"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        prop="xjMoney"
        label="现金支付金额"
        align="center"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        prop="wxpayCount"
        label="微信订单数"
        align="center"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        prop="alipayCount"
        label="支付宝订单数"
        align="center"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        prop="xjpayCount"
        label="现金订单数"
        align="center"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        prop="nopayCount"
        label="未支付订单数"
        align="center"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        prop="counts"
        label="实付0元订单数"
        align="center"
        min-width="150"
      >
      </el-table-column>
    </el-table>

    <div class="pagination-part">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParam.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageParam.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageParam.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tableMix from "@/mixins/table";
import { getObj } from "@/api/pay/financeCheck";
export default {
  mixins: [tableMix],
  data() {
    return {
      dateRange: [],
      filParam: {
        createDate: "",
        createDates: "",
      },
      pickerOption: {
        disabledDate(year) {
          let temp = new Date(year).getTime();
          let curYear = new Date().getTime();
          if (temp > curYear) {
            return true;
          }
        },
      },
      tableData: [],
      loading: false,
    };
  },
  created() {
    this.setDefaiultTime();
  },
  mounted() {
    this.getList();
  },
  methods: {
    /**
     * 获取列表信息
     */
    getList() {
      this.loading = true
      let temp = Object.assign({}, this.pageParam, this.filParam);
      getObj(temp).then((res) => {
        if (
          res.data.data &&
          res.data.data.orders &&
          res.data.data.orders.length > 0
        ) {
          this.tableData = res.data.data.orders;
          this.pageParam.total = res.data.data.total;
        } else {
          this.tableData = [];
          this.pageParam.total = 0;
        }
        this.loading = false
      }).catch(()=>{
        this.loading = false
      });
    },
    /**
     * 设置默认时间
     */
    setDefaiultTime() {
      let time = new Date();
      var year = time.getFullYear();
      var month = time.getMonth() + 1 - 1;
      var dayDate = new Date(year, month, 0).getDate();

      if (month == 0) {
        year = parseInt(year) - 1;
        month = 12;
      }
      if (month < 10) {
        month = "0" + month;
      }
      var dateTime = year + "-" + month + "-" + "01";
      var dateTime1 = year + "-" + month + "-" + dayDate;

      this.filParam.createDate = dateTime;
      this.filParam.createDates = dateTime1;
      this.dateRange = [this.filParam.createDate, this.filParam.createDates];
    },

    /**
     * 改变日期触发函数
     */
    changeDate(val) {
      if (val && val.length === 2 && val[0] && val[1]) {
        this.filParam.createDate = val[0];
        this.filParam.createDates = val[1];
      } else {
        this.setDefaiultTime();
      }
    },
    /**
     * 根据指定日期查询
     */
    search() {
      this.current = 1;
      this.getList();
      this.$emit("refresh", this.dateRange);
    },
  },
};
</script>


<style lang="scss" scoped>
.contain {
  margin-top: 1vh;
  background-color: #fff;
}
.filter-part {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 25px 3%;
}
.pagination-part {
  padding: 20px 5% 20px 0;
  text-align: right;
}
</style>
<template>
  <div class="financeCheck">
    <basic-container>
      <div class="top">
        <h3>{{filParam.createDate}}至{{filParam.createDates}}对账数据</h3>
        <ul>
          <li>
            <div class="item">
              <span class="name">支付宝订单数:</span>
              <span class="value">{{ item.aliOrderCount }}</span>
            </div>
            <div class="item">
              <span class="name">支付宝支付金额:</span>
              <span class="value">￥{{ item.aliTotal }}</span>
            </div>
            <div class="item">
              <span class="name">车场收款单数:</span>
              <span class="value">{{ item.alipayCount }}</span>
            </div>
            <div class="item">
              <span class="name">车场收款金额:</span>
              <span class="value">￥{{ item.alipayMoney }}</span>
            </div>
          </li>
          <li>
            <div class="item">
              <span class="name">微信订单数:</span>
              <span class="value">{{ item.wxOrderCount }}</span>
            </div>
            <div class="item">
              <span class="name">微信支付金额:</span>
              <span class="value">￥{{ item.wxTotal }}</span>
            </div>
            <div class="item">
              <span class="name">车场收款单数:</span>
              <span class="value">{{ item.wxpayCount }}</span>
            </div>
            <div class="item">
              <span class="name">车场收款金额:</span>
              <span class="value">￥{{ item.wxpayMoney }}</span>
            </div>
          </li>
          <li>
            <div class="item">
              <span class="name">现金订单数:</span>
              <span class="value">{{ item.xjpayCount }}</span>
            </div>
            <div class="item">
              <span class="name">现金支付金额:</span>
              <span class="value"
                >￥{{ item.xjMoney }}</span
              >
            </div>
          </li>
          <li>
            <div class="item">
              <span class="name">未支付订单数:</span>
              <span class="value">{{ item.nopayCount }}</span>
            </div>
            <div class="item">
              <span class="name">实付0元订单数:</span>
              <span class="value">{{ item.counts }}</span>
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="btn"
              @click="editBtn"
              >去处理</el-button
            >
          </li>
        </ul>
      </div>
      <div class="table"><income-comp @refresh="getItem"></income-comp></div>
      <gate-income></gate-income>
    </basic-container>
  </div>
</template>

<script>
import incomeComp from "./components/income/index";
import { getCount } from "@/api/pay/financeCheck";
import gateIncome from "./components/gateIncome/index";
import state from "./state";
export default {
  name: "financeCheck",
  data() {
    return {
      item: {},
      filParam: {
        createDate: "",
        createDates: "",
      },
    };
  },
  components: {
    incomeComp,
    gateIncome,
  },
  created() {
    this.setDefaiultTime();
  },
  methods: {
    /**
     * 获取数据
     */
    getItem(searchForm) {
      if (searchForm) {
        this.filParam.createDate = searchForm[0];
        this.filParam.createDates = searchForm[1];
      }
      let temp = Object.assign({}, this.filParam);
      getCount(temp).then((res) => {
        this.item = res.data.data[0];
      });
    },

    /**
     * 点击去处理跳转页面
     */
    editBtn() {
      state.shouSign = true;
      state.parkIncome = "parkIncome";
      state.filParam = this.filParam
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

      this.getItem();
    },
  },

  beforeDestroy(){
    state.shouSign = false;
  },
};
</script>

<style lang="scss" scoped>
.top {
  h3 {
    color: #409eff;
    padding-bottom: 20px;
  }
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      padding: 0 20px;
      width: 21.8%;
      height: 190px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      list-style: none;
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        padding: 3% 0;
        .name {
          letter-spacing: 1px;
        }
      }
      .btn {
        margin-top: 10px;
      }
    }
  }
}
.table {
  margin-top: 20px;
}
</style>
<template>
  <div class="contain">
    <div class="header">        
      <span>车场收入日报</span>
    </div>
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
          @change="changeDate">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" style="margin-left:30px" size="mini" @click="search">搜索</el-button>
      </div>
      <div>
        <el-button icon="el-icon-refresh" circle @click="getList"></el-button>
        <el-button type="primary" icon="el-icon-download" circle @click="exportExcel"></el-button>
      </div>
    </div>

    <el-table
      :data="tableData" size="medium" border
      style="width: 100%">
      <el-table-column
        fixed
        prop="createDate"
        label="日期"
        align="center"
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="counts"
        label="总订单数"
        align="center"
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="xjMoney"
        label="现金支付(元)"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="alipayMoney"
        label="支付宝支付(元)"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="wxpayMoney"
        label="微信支付(元)"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="YHtotal"
        label="减免金额(元)"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="couponTotal"
        label="优惠金额(元)"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="couponDuration"
        label="优惠时长(分钟)"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="total"
        label="实收金额(元)"
        align="center"
        min-width="180">
      </el-table-column>
    </el-table>

    <div class="pagination-part">
      <div>
        <div class="line">
          总订单数为<span class="num">{{orderCount||0}}</span>笔
        </div>
        <div class="line">
          实收总金额为<span class="num">{{totalCount||0}}</span>元
        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParam.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageParam.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="pageParam.total">
      </el-pagination>
    </div>

  </div>
  
</template>

<script>
  import tableMix from '@/mixins/table'
  import {dateFormat} from '@/util/date'
  import { getDailyList,exportExcel} from '@/api/pay/finalStat'
  export default {
    data() {
      return {
        pageParam:{
          current:1,
          size:10,
          total:0
        },
        dateRange:[],
        filParam:{
          createDate:'',  //开始时间
          createDates:'',  //结束时间
        },
        tableData: [],
        orderCount:0,
        totalCount:0,
        pickerOption:{
          disabledDate(year){
            let temp = new Date(year).getTime();
            let curYear = new Date().getTime();
            if(temp > curYear){
              return true
            }
          }
        }
      }
    },
    created(){
      this.setDefaiultTime();
    },
    mounted(){
      this.getList();
    },
    methods: {
      /**
       * 获取列表信息
       */
      getList(){
        let temp = Object.assign({},this.pageParam,this.filParam);
        getDailyList(temp).then(res=>{
          let data = res.data.data;
          if(res.data.data && res.data.data.orders && res.data.data.orders.length > 0){
            this.tableData = data.orders;
            this.pageParam.total = data.total;
          }else{
            this.tableData = [];
            this.pageParam.total = 0;
          }
          if(data && data.records){
            this.orderCount = data.records[0].orderCount;
            this.totalCount = data.records[0].totalCount;
          }
        })
      },
      /**
       * 设置默认时间
       */
      setDefaiultTime(){
        let time = new Date(); 
        this.filParam.createDate = this.filParam.createDates = dateFormat(time,'yyyy-MM-dd');
         this.dateRange = [this.filParam.createDate,this.filParam.createDates];
      },
      /**
       * 改变日期触发函数
       */
      changeDate(val){
        if(val && val.length ===2 && val[0] && val[1]){
          this.filParam.createDate = val[0];
          this.filParam.createDates = val[1];
        }else{
          this.setDefaiultTime();
        }
      },
      /**
       * 根据指定日期查询
       */
      search(){
        this.current = 1;
        this.getList();
      },
      handleSizeChange(val){
        this.pageParam.size = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.pageParam.current = val;
        this.getList();
      },
      /**
       * 导出excel
       */
      exportExcel(){
        exportExcel(this.filParam).then(res=>{
          let url = window.URL.createObjectURL(new Blob([res.data]));
          this.downloadFun(url);
        })
      },
      downloadFun(blobUrl) {
        const a = document.createElement('a');
        a.download = '车场收入日报.xlsx';
        a.href = blobUrl;
        a.click();
      }
    },
  }
</script>


<style lang="scss" scoped>
  .contain {
    margin-top:1.5vh;
    background-color: #fff;
    padding:1% 15px;
  }
  .header {
    padding:10px 0;
    font-size: 18px;
    font-weight: 600;
    color:#409EFF;
  }
  .filter-part {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    padding:25px 3%;
  }
  .pagination-part {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding:20px 5% 20px 3%;
    .line {
      display: inline-block;
      margin-right: 15px;
      font-size: 15px;
      .num {
        font-size: 16px;
        font-weight: 600;
        margin:0 5px;
      }
    }
  }
</style>
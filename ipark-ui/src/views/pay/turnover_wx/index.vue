<template>
  <div class="coupon-contain">
    <el-card class="filter-part">
      <el-form :inline="true" :model="filForm" class="filer-form">

        <el-form-item>
          <el-date-picker
            v-model="expendDate"
            type="daterange"
            range-separator="至"
            start-placeholder="支付起始日期"
            end-placeholder="支付结束日期">
          </el-date-picker>
        </el-form-item>
        
        <el-form-item>
          <el-input v-model="filForm.channel" placeholder="请输入车牌号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-select v-model="filForm.status" placeholder="请选择支付状态">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="filForm.status" placeholder="请选择车辆类型">
            <el-option
              v-for="item in carTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="search-btn" icon="el-icon-search" @click="getList">查询</el-button>
          <el-button type="warning" class="search-btn" icon="el-icon-printer" @click="exportExcel">导出</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <main>
      <el-card>
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#409EFF',color:'#fff',fontSize:'13px',fontWeight:500}">

          <el-table-column
            type="index"
            align="center"
            width="50">
          </el-table-column>

          <el-table-column
            prop="date"
            label="车牌号"
            align="center"
            min-width="100">
          </el-table-column>

          <el-table-column
            prop="name"
            label="支付订单编号"
            align="center"
            min-width="130">
          </el-table-column>

          <el-table-column
            prop="address"
            label="支付金额"
            align="center"
            min-width="100">
          </el-table-column>

          <el-table-column
            prop="address"
            label="支付时间"
            align="center"
            min-width="150">
          </el-table-column>
          
          <el-table-column
            prop="address"
            label="支付状态"
            align="center"
            min-width="100">
          </el-table-column>

          <el-table-column
            prop="address"
            label="收款商家"
            align="center"
            min-width="120">
          </el-table-column>         

        </el-table>

        <div class="pagination-part">
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

      </el-card>
    </main>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table'
  export default {
    mixins:[tableMixin],
    data(){
      return {
        filForm:{},
        expendDate:[],
        typeList:[],
        statusList:[],
        carTypeList:[],
        tableData:[{}],
      }
    },
    methods:{
      /**
       * 获取列表
       */
      getList(){

      },
      /**
       * 打开操作模态框
       */
      operation(item){
        this.$refs.operationComp.open(item);
      },
      /**
       * 列表导出
       */
      exportExcel(){

      }
    }
  }
</script>

<style lang="scss">
  .coupon-contain {
    .filter-part{
      .el-card__body {
        padding:20px 10px 0;
      }
    }
  }
</style>

<style lang='scss' scoped>
  .coupon-contain {
    padding:10px;
  }
  .search-btn {
    margin-left:40px;
  }
  main {
    margin-top:10px;
    .add-part {
      margin-bottom: 10px;
    }
    .pagination-part {
      text-align: right;
      padding:15px 6% 15px 0;
    }
  } 
</style>
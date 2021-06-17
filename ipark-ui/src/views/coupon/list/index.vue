<template>
  <div class="coupon-contain">
    <el-card class="filter-part">
      <el-form :inline="true" :model="filForm" class="filer-form" label-width="150px">

        <el-form-item label="票劵类型">
           <el-select v-model="filForm.type" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="票券状态">
          <el-select v-model="filForm.status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="发放渠道">
          <el-input v-model="filForm.channel" placeholder="发放渠道"></el-input>
        </el-form-item>

        <el-form-item label="票券名称">
          <el-input v-model="filForm.name" placeholder="票券名称"></el-input>
        </el-form-item>
        
         <el-form-item label="有效期">
            <el-date-picker
              v-model="filForm.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="search-btn" icon="el-icon-search" @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <main>
      <el-card>
        <div class="add-part">
          <el-button type="success" size="mini" icon="el-icon-plus" @click="add">新增</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#409EFF',color:'#fff',fontSize:'13px',fontWeight:500}">

          <el-table-column
            type="index"
            align="center"
            width="50">
          </el-table-column>

          <el-table-column
            prop="date"
            label="名称"
            align="center"
            min-width="140">
          </el-table-column>

          <el-table-column
            prop="name"
            label="类型"
            align="center"
            min-width="100">
          </el-table-column>

          <el-table-column
            prop="address"
            label="发放渠道"
            align="center"
            min-width="140">
          </el-table-column>

          <el-table-column
            prop="address"
            label="有效期"
            align="center"
            min-width="240">
          </el-table-column>
          
          <el-table-column
            prop="address"
            label="发放量"
            align="center"
            min-width="80">
          </el-table-column>

          <el-table-column
            prop="address"
            label="库存"
            align="center"
            min-width="80">
          </el-table-column>

          <el-table-column
            prop="核销量"
            label="发放量"
            align="center"
            min-width="80">
          </el-table-column>

          <el-table-column
            prop="address"
            label="核销比率"
            align="center"
            min-width="100">
          </el-table-column>

          <el-table-column
            prop="address"
            label="优惠券金额"
            align="center"
            min-width="100">
          </el-table-column>

          <el-table-column
            prop="address"
            label="状态"
            align="center"
            min-width="100">
          </el-table-column>

          <el-table-column
            prop="address"
            label="操作"
            fixed="right"
            align="center"
            min-width="320">
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini">编辑</el-button>
              <el-button type="info" plain size="mini">查看</el-button>
              <el-button type="warning" plain size="mini">核销明细</el-button>
              <el-button type="danger" plain size="mini">停发</el-button>
            </template>
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
    <add-comp @refresh="getList"></add-comp>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table'
import { mutations } from './state.js'
import addComp from './components/add'
  export default {
    components:{
      addComp
    },
    mixins:[tableMixin],
    data(){
      return {
        filForm:{},
        typeList:[],
        statusList:[],
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
       * 打开新增模态框
       */
      add(){
        mutations.changeAddShow();
        mutations.changeAddSign('add');
      },
      /**
       * 打开编辑模态框
       */
      edit(){
        mutations.changeAddShow();
        mutations.changeAddSign('edit');
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
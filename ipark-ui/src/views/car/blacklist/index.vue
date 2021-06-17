
<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="rowDel"
        @search-reset="searchReset">

          <template slot-scope="scope" slot="search">
            <div class="date-search-part">
              <span class="label" style="min-width: 80px;">添加时间：</span>
              <el-date-picker
                v-model="searchDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                @change="changeSearchDate">
              </el-date-picker>
            </div>
          </template>

          <template slot-scope="scope" slot="plateNumberForm">
            
            <plat-comp v-model="scope.row.plateNumber" :scope="scope" v-if="!scope.disabled"></plat-comp>
            <span v-else style="padding:0 15px">{{scope.row.plateNumber}}</span>
          </template>

          <!-- <template slot-scope="scope" slot="typeForm">
            <el-select
              v-model="scope.row.type"
              placeholder="请选择车辆类型"
              @change="changeCarType(scope.row)"
              clearable>
              <el-option
                v-for="item in carTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template> -->

          <template slot="menuLeft">
            <el-button type="primary" size="small" @click="download">excel下载</el-button>
          </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  fetchPage,
  putObj,
  download,
} from "@/api/car/blacklist";
import { tableOption } from "@/const/crud/car/blacklist";
import { mapGetters } from "vuex";
import platComp from '@/components/plat/index'

export default {
  name: "Tenant",
  components:{
    platComp
  },
  data() {
    return {
      searchDate:[],
      tableData: [],
      searchForm: {
        startDate:'',
        endDate:''
      },
      tempSearchData:{},
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      tableLoading: false
    }
  },
  computed: {
    ...mapGetters(["permissions", "carTypeList"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.car_blacklist_add, false),
        delBtn: this.vaildData(this.permissions.car_blacklist_del, false),
        editBtn: this.vaildData(this.permissions.car_blacklist_edit, false),
        viewBtn: this.vaildData(this.permissions.car_blacklist_view, false)
      }
    },
    tableOption() {
      tableOption.column.forEach((i) => {
        if (i.prop === "type") {
          i.dicData = this.carTypeList;
        }
      });
      return tableOption;
    },
  },
  create() {
    carTypeList;
    tableOption;
  },
  methods: {
    getList(page, params) {
      this.tableLoading = true;
      fetchPage(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          params,
          this.searchForm
        )
      )
        .then((response) => {
          this.tableData = response.data.data.records;
          this.page.total = response.data.data.total;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    rowDel: function (row, index) {
      var _this = this;
      this.$confirm("是否确认删除此条数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delObj(row.id);
        })
        .then((data) => {
          _this.$message.success("删除成功");
          this.getList(this.page);
        });
    },
    handleSave: function (row, done, loading) {
      addObj(row)
        .then((data) => {
          this.$message.success("添加成功");
          done();
          this.getList(this.page);
        })
        .catch(() => {
          loading();
        });
    },
    handleUpdate: function (row, index, done, loading) {
      putObj(row)
        .then((data) => {
          this.$message.success("修改成功");
          done();
          this.getList(this.page);
        })
    },
    searchChange(form, done) {
      this.tempSearchData = form;
      this.page.currentPage = 1
      this.getList(this.page, form)
      done()
    },
    refreshChange() {
      this.getList(this.page)
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    },
    download(){
      download(this.tempSearchData).then(res =>{
        // ,{type:"application/vnd.ms-excel"}
        let url = window.URL.createObjectURL(new Blob([res.data]));
        this.downloadFun(url);
      })
    },
    downloadFun(blobUrl) {
      const a = document.createElement('a');
      a.download = '黑名单.xlsx';
      a.href = blobUrl;
      a.click();
    },
    changeSearchDate(val){
      if(val && val.length>0){
        this.searchForm.startDate = val[0];
        this.searchForm.endDate = val[1];
      }
    },
    searchReset() {
      this.searchDate = [];
      this.searchForm = {};
      this.getList(this.page, this.searchForm);
    }
  },
};
</script>

<style lang="scss" scoped>
    .date-search-part {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 25px;
    }
</style>

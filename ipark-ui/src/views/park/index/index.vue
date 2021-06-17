
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
        @search-reset="searchReset"
      >
        <template slot-scope="scope" slot="existScanForm">
          <el-select
            v-model="scope.row.existScan"
            placeholder="请选择"
            @change="existScanChange(scope.row)"
          >
            <el-option label="支持" value="Y"></el-option>
            <el-option label="不支持" value="N"></el-option>
          </el-select>
        </template>

        <template slot-scope="scope" slot="scanOutTimeForm">
          <el-input
            placeholder="提前付之后扫码出场时间"
            v-model="scope.row.scanOutTime"
            clearable
            :disabled="scope.row.existScan === 'N'"
            @input="scanOutTimeFormChange(scope.row)"
          >
            <template slot="append">分</template>
          </el-input>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { addObj, delObj, fetchPage, putObj } from "@/api/park/park";
import { tableOption } from "@/const/crud/park/park";
import { mapGetters } from "vuex";

export default {
  name: "Tenant",
  data() {
    return {
      tableData: [],
      searchForm: {},
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
    };
  },
  computed: {
    ...mapGetters(["permissions", "userInfo"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.park_index_add, false),
        delBtn: this.vaildData(this.permissions.park_index_del, false),
        editBtn: this.vaildData(this.permissions.park_index_edit, false),
        viewBtn: this.vaildData(this.permissions.park_index_view, false),
      };
    },
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
      this.$confirm("是否确认删除当前车场", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delObj(row.id);
        })
        .then((data) => {
          _this.$message.success("删除成功");
          this.refreshChange();
        });
    },
    handleUpdate: function (row, index, done, loading) {
      putObj(row)
        .then((data) => {
          this.$message.success("修改成功");
          done();
          this.refreshChange();
        })
        .catch(() => {
          loading();
        });
    },
    handleSave: function (row, done, loading) {
      addObj(row)
        .then((data) => {
          this.$message.success("添加成功");
          done();
          this.refreshChange();
        })
        .catch(() => {
          loading();
        });
    },
    searchChange(form, done) {
      this.searchForm = form;
      this.page.currentPage = 1;
      this.getList(this.page, form);
      done();
    },
    existScanChange(item) {
      if (item.existScan === "Y") {
        item.scanOutTime = 30;
      } else {
        item.scanOutTime = 0;
      }
    },
    scanOutTimeFormChange(item){
      if(item.scanOutTime){
        item.existScan = "Y"
      }else{
        item.existScan = ""
      }
    },
    refreshChange() {
      this.getList(this.page);
      this.refreshTopPark();
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    searchReset() {
      this.searchForm = {};
      this.getList(this.page, this.searchForm);
    },
    refreshTopPark(){
      if(this.userInfo.userId || this.userInfo.userId === 0){
        this.$store.dispatch('GetParkByUser',this.userInfo.userId);
      }
    }
  },
};
</script>

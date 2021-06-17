
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
        <template slot-scope="scope" slot="plateNumberForm">
          <plat-comp
            v-model="scope.row.plateNumber"
            :scope="scope"
            v-if="!scope.disabled"
          ></plat-comp>
          <span v-else style="padding: 0 15px">{{
            scope.row.plateNumber
          }}</span>
        </template>

        <template slot="menuLeft">
          <el-upload
            class="upload-demo"
            action=""
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            :http-request="uploadFile"
            :file-list="fileList"
            :show-file-list="false"
          >
            <el-button type="primary" size="small">导入</el-button>
          </el-upload>
          <el-button type="primary" size="small" @click="download"
            >导出</el-button
          >
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
  inloadData,
  downloadData,
} from "@/api/car/special";
import { tableOption } from "@/const/crud/car/special";
import { mapGetters } from "vuex";
import platComp from "@/components/plat/index";

export default {
  name: "Tenant",
  components: {
    platComp,
  },
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
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.car_special_add, false),
        delBtn: this.vaildData(this.permissions.car_special_del, false),
        editBtn: this.vaildData(this.permissions.car_special_edit, false),
        viewBtn: this.vaildData(this.permissions.car_special_view, false),
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
      this.$confirm("是否确认删除当前车辆", "提示", {
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
    handleUpdate: function (row, index, done, loading) {
      putObj(row)
        .then((data) => {
          this.$message.success("修改成功");
          done();
          this.getList(this.page);
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
          this.getList(this.page);
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
      this.searchForm = {};
      this.getList(this.page, this.searchForm);
    },
    /**
     * 导入
     */
    uploadFile(item) {
      const form = new FormData();
      form.append("file", item.file);
      this.tableLoading = true
      inloadData(form).then(res => {
        // console.log(res);
        if(res.data.code == 0){
          this.tableLoading = false;
          this.getList(this.page)
          this.$message.success("导入成功");
        }else{
          this.tableLoading = false;
          this.$message.error("导入失败");
        }
      })
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
      a.download = "特殊车辆.xlsx";
      a.href = blobUrl;
      a.click();
    },
  },
};
</script>

<style scoped>
.upload-demo {
  display: inline-block;
}
</style>

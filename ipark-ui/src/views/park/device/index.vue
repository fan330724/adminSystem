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
        <template slot-scope="scope" slot="carType">
          <div>{{ scope.row.carType | carTypeFil }}</div>
        </template>

        <!-- <template slot-scope="scope" slot="gateType">
          <div>{{ scope.row.gateType | gateType }}</div>
        </template> -->

        <template slot-scope="scope" slot="carTypeForm">
          <el-select
            v-model="scope.row.carType"
            placeholder="仅支持通道模式"
            multiple
            @change="changeCarType(scope.row)"
            :disabled="scope.row.currentModel !== 'D'"
            clearable
          >
            <el-option
              v-for="item in carTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>

        <template slot-scope="scope" slot="menu">
          <el-button
            type="text"
            size="small"
            icon="el-icon-download"
            @click.native="showDown(scope.row, scope.index)"
            v-if="permissionList.downBtn"
            >下载二维码</el-button
          >
        </template>

        <template slot-scope="scope" slot="menuLeft">
          <el-button
            type="primary"
            icon="el-icon-download"
            size="small"
            @click.stop="showDown"
            >下载提前付二维码</el-button
          >
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { addObj, delObj, fetchPage, putObj, downCode } from "@/api/park/device";
import { getByUser as getParkByUser } from "@/api/park/park";
import { getByPark } from "@/api/park/sentry";
import { tableOption } from "@/const/crud/park/device";
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
      curParkId: "", //当前选中的车场id
    };
  },
  computed: {
    ...mapGetters(["permissions", "userInfo"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.park_device_add, false),
        delBtn: this.vaildData(this.permissions.park_device_del, false),
        editBtn: this.vaildData(this.permissions.park_device_edit, false),
        downBtn: this.vaildData(this.permissions.park_device_down, false),
      };
    },
  },
  filters: {
    carTypeFil(val) {
      let result = "";
      if (val) {
        result = val
          .replace(/G/g, "固定车")
          .replace(/Q/g, "亲情车")
          .replace(/Y/g, "员工车");
      }
      return result;
    },
    gateType(val) {
      let result = "";
      if (val) {
        result = val.toString().replace(/1/g, "入口").replace(/2/g, "出口");
      }
      return result;
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
      this.$confirm("是否确认删除当前设备", "提示", {
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
     * 获取所选车场下的岗亭列表
     */
    geGateList(curParkId) {
      getByPark({ parkId: curParkId }).then((response) => {
        let records = response.data.data.records;
        if (records && records.length > 0) {
          this.gateList = response.data.data.records;
        } else {
          this.gateList = [];
        }
      });
    },
    /**
     * 选择车场触发
     */
    changePark(item) {
      this.curParkId = item.parkId;
      this.geGateList(this.curParkId);
    },
    /**
     * 选择岗亭触发
     */
    changeGate(item) {
      let curGate = {};
      let temp = this.gateList.filter((i) => {
        return i.id === item.gateId;
      });
      if (temp && temp.length > 0) {
        curGate = temp[0];
        item.status = curGate.status;
      }
    },

    /**
     * 下载二维码
     */
    showDown(row) {
      let temp = Object.assign({
        cameraId: row.id,
      });
      downCode(temp).then((res) => {
        let url = window.URL.createObjectURL(new Blob([res.data]));
        this.downloadFun(url, row);
      });
    },
    downloadFun(blobUrl, row) {
      const a = document.createElement("a");
      a.href = blobUrl;
      if (row.cameraName && row.gateType) {
        a.download =
          row.cameraName +
          this.$options.filters["gateType"](row.gateType) +
          ".png";
      } else {
        a.download = "提前付.png";
      }
      a.click();
    },
  },
};
</script>

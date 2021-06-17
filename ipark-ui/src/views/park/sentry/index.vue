<template>
  <div class="container park-sentry-container " v-loading="loading">
    <main >
      <div class="top-part">
        <el-button type="primary" size="small" @click="add()" v-if="permissionList.addSign">新增</el-button>
      </div>
      <div v-if="list && list.length>0">
      <div class="list">
        <div class="item" v-for="(item,index) in list" :key="index" style="min-width:220px;">
          <div class="top">
            <div class="img-area">
              <img src="/img/park/park_space.png" alt="" class="img">
            </div>
            <div class="top-right">
              <div class="line"><span class="label">岗亭名称：</span><span class="txt" v-text="item.name" :title="item.name"></span></div>
              <!-- <div class="line"><span  class="label">责任人：</span><span class="txt" v-text="item.liablePerson" :title="item.liablePerson"></span></div> -->
              <div class="line"><span  class="label">在线状态：</span><span class="txt" v-text="item.exitOnline === 'Y'?'在线':'不在线'" :title="item.liablePerson"></span></div>
              <div class="line">
                <span  class="label">是否开启：</span><span>
                <el-switch
                  v-model="item.status"
                  active-color="#13ce66"
                  active-value="Y"
                  inactive-value="N"
                  @change="changeStatus(item)">
                </el-switch>
                </span>
              </div>
            </div>
          </div>
          <div class="bottom">
            <span class="btn" @click="mangCar(item)" v-if="permissionList.transitSign">管理通行车辆</span>
            <span class="btn" @click="edit(item)" v-if="permissionList.editSign">编辑</span>
            <span class="btn" @click="info(item)" v-if="permissionList.viewSign">查看</span>
            <span class="btn" @click="beforeDel(item.id)" v-if="permissionList.delSign">删除</span>
          </div>
        </div>
      </div>
      
      <div class="pagination-part">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="page.pageSize"
          :total="page.total" @current-change ="changePage">
        </el-pagination>
      </div>
      </div>

      <div v-if="!loading && (!list || list.length===0)">
        <no-data-comp></no-data-comp>
      </div>
    </main>
    <add-comp @fresh="getList"></add-comp>
    <mang-car-comp @fresh="getList"></mang-car-comp>
  </div>
</template>

<script>
  import addComp from './components/add'
  import mangCarComp from './components/mangCar'
  import noDataComp from '@/components/noData/index'
  import { delObj, fetchPage, putObj} from '@/api/park/sentry'
  import {mapGetters} from 'vuex'
  import state from './state.js'
  export default {
    name: 'Tenant',
    components:{addComp,noDataComp,mangCarComp},
    data() {
      return {
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 12// 每页显示多少条
        },
        loading:false,
        list:[]
      }
    },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        let result =  {
          addSign: this.vaildData(this.permissions.park_sentry_add, false),
          delSign: this.vaildData(this.permissions.park_sentry_del, false),
          editSign: this.vaildData(this.permissions.park_sentry_edit, false),
          viewSign: this.vaildData(this.permissions.park_sentry_view, false),
          transitSign: this.vaildData(this.permissions.park_sentry_transit, false)
        }
        return result;
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      //获取当前列表
      getList() {
        this.loading = true;
        fetchPage(Object.assign({
          current: this.page.currentPage,
          size: this.page.pageSize
        })).then(response => {
          this.loading = false;
          this.list = response.data.data.records;
          this.page.total = response.data.data.total;
        }).catch(err=>{
          this.loading = false;
        })
      },
      //改变当前页数
      changePage(val){
        this.page.currentPage = val;
        this.getList();
      },
      /**
       * 新增岗亭
       */
      add(item){
        state.addSign = true;
        state.editStatus = 'add';
      },
      /**
       * 编辑岗亭
       */
      edit(item){
        state.item = item;
        state.editStatus = 'edit';
        state.addSign = true;
      },
      /**
       * 管理岗亭通行车辆
       */
      mangCar(item){
        state.item = item;
        state.carMangSign = true;
      },
      /**
       * 岗亭详情
       */
      info(item){
        state.item = item;
        state.editStatus = 'info';
        state.addSign = true;
      },
      /**
       * 删除前的确定
       */
      beforeDel(id){
        this.$confirm('是否删除此岗亭?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.del(id);
        })
      },
      /**
       * 删除岗亭
       */
      del(id){
        delObj(id).then(res=>{
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getList();
        }).catch(err=>{
          this.$message({
            message: '删除失败',
            type: 'error'
          });
        })
      },
      /**
       * 改变岗亭状态
       */
      changeStatus(item){
        let beforeStatus = ''; //改变之前的状态
        let temp = JSON.parse(JSON.stringify(item));
        if(temp.status === 'Y'){
          beforeStatus='N';
        }else{
          beforeStatus='Y';
        }
        putObj(temp).then(res=>{
          let msg = '成功开启岗亭';
          let msgStatus = 'success';
          if(temp.status==='N'){
            msg = '已关闭岗亭';
            msgStatus = 'warning';
          }
          this.$message({
            message: msg,
            type: msgStatus,
            duration:1100
          });
        }).catch(err=>{
          this.$message({
            message: '操作失败',
            type: 'error'
          });
          item.status = beforeStatus; //重置之前的状态
        })
      }
  }
  }
</script>

<style lang="scss" scoped>
  .container {
    min-height: 100%;
    padding:5px 20px 50px;
    main {
      min-height: 100%;
    }
  }
  .park-sentry-container {
   
  }
  .top-part {
    margin-bottom:15px;
  }
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    .item {
      width:18%;
      padding:15px;
      background-color: #fff;
      border-radius: 5px;
      margin-right:20px;
      margin-bottom: 15px;
      .top {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-bottom: 20px;
        overflow: hidden;
        .img-area {
          width: 35%;
          padding-bottom: 25%;
          margin-right:6%;
          position: relative;
          background-color: #fff;
          //border:1px solid #eee;
        }
        .img {
          width:100%;
          height:100%;;
          position: absolute;
          left: 0;
          top: 0;
        }
        .top-right {
          flex: 1;
          overflow: hidden;
          .line {
            line-height: 200%;
            font-size: 15px;
            white-space: nowrap;
            .label {
              font-weight: 500;
            }
            .txt {
              display: inline-block;
              width:60%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              vertical-align: middle;
            }
          }
        }
      }
      .bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding-top:20px;
        border-top:1px dotted #ccc;
        .btn {
          border:1px solid #ccc;
          padding:5px 10px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 15px;
        }
      }
    }
  }

  .pagination-part {
    padding: 10px 15% 5px 0;
    text-align: right;
  }
</style>

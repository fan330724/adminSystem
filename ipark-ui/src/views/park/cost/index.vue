<template>
  <div class="container park-sentry-container" v-loading="loading">
    <main>
      <div class="top-part">
        <el-button type="primary" size="small" @click="add()" v-if="permissionList.addSign">新增</el-button>
      </div>
      <div v-if="list && list.length>0">

        <div class="list-part">
          <div class="item-part" v-for="(child,pIdx) in list" :key="pIdx">
            <div class="part-title">{{child.carTypeName}}</div>
            <div class="list">
              <div class="item" v-for="(item,index) in child.list" :key="index">
                <div class="title">{{item.type|typeFil}}</div>
                <div class="top">
                  <div class="img-area">
                    <img src="/img/park/park_cost.png" alt="" class="img">
                  </div>
                  <div class="top-right">
                    <div class="line"><span class="label">免费时长：</span><span class="txt">{{item.freeTime}}分钟</span></div>

                    <div class="line">
                      <div v-if="item.type === '1'">
                        <span class="label">收费单价：</span><span class="txt">{{item.intervalPrice}}元 / {{item.intervalLength}}分钟</span>
                      </div>
                      <div v-else>
                        <div class="label">收费单价：</div>
                        <div>
                          <p class="">{{item.startTime}}-{{item.endTime}} {{item.firstTopPrice}}元 / {{item.firstTopLength}}分钟</p>
                          <p>{{item.endTime}}-{{item.startTime}} {{item.intervalPrice}}元 / {{item.intervalLength}}分钟</p>
                        </div>
                      </div>
                    </div>
                    <div class="line"><span  class="label">费用上限：</span><span class="txt">{{item.topPrice|topPriceFil }}</span></div>
                    <div class="line">
                      <span  class="label">是否启用：</span><span>
                      <el-switch
                        v-model="item.status"
                        active-color="#13ce66"
                        active-value="Y"
                        inactive-value="N"
                        @change="changeStatus(item,child)">
                      </el-switch>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <span class="btn" @click="edit(item)" v-if="permissionList.editSign">编辑</span>
                  <span class="btn" @click="info(item)" v-if="permissionList.viewSign">查看</span>
                  <span class="btn" @click="beforeDel(item.id)" v-if="permissionList.delSign">删除</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>

      <div v-if="!loading && (!list || list.length===0)">
        <no-data-comp></no-data-comp>
      </div>

    </main>
    <add-comp @fresh="getList"></add-comp>
  </div>
</template>

<script>
  import addComp from './components/add'
  import noDataComp from '@/components/noData/index'
  import { delObj, fetchPage, putObj, updateStatus } from '@/api/park/cost'
  import {mapGetters} from 'vuex'
  import state from './state.js'
  export default {
    name: 'Tenant',
    components:{addComp, noDataComp},
    data() {
      return {
        list:[],
        loading:false
      }
    },
    computed: {
      ...mapGetters(['permissions','carTypeList']),
      permissionList() {
        let result =  {
          addSign: this.vaildData(this.permissions.park_cost_add, false),
          delSign: this.vaildData(this.permissions.park_cost_del, false),
          editSign: this.vaildData(this.permissions.park_cost_edit, false),
          viewSign: this.vaildData(this.permissions.park_cost_view, false)
        }
        return result;
      }
    },
    mounted() {
      this.getList();
    },
    filters:{
      typeFil(type){
        let result = '';
        if(type ==='1'){
          result = "计时收费";
        }else if(type === '2'){
          result = "计段收费"
        }else {
          result = ""
        }
        return result;
      },
      topPriceFil(price){
        let result = "";
        if(price == 0){
          result = "无上限";
        }else if(price && Number(price)>0){
          result = price + "元";
        }else {
          result ="未设置"
        }
        return result;
      }
    },
    methods: {
      //获取当前列表
      getList() {
        this.loading = true;
        fetchPage().then(response => {
          this.loading = false;
          this.list = response.data.data;
        }).catch(err=>{
          this.loading = false;
        })
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
        this.$confirm('是否删除此计费规则?', {
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
      * 改变计费开启状态
      */
      changeStatus(item,child){
        let beforeStatus = ''; //改变之前的状态
        if(item.status === 'Y'){
          beforeStatus='N';
        }else{
          beforeStatus='Y';
        }
        let params = {
          status:item.status,
          id:item.id,
          carType:item.carType
        }
        updateStatus(params).then(res=>{
          if(item.status==='Y' && child.list && child.list.length>1){
            let temp = child.list.filter(i=>{return i.id!== item.id});
            temp.forEach(i=>{
              i.status = 'N';
            })
          }
          let msg = '成功开启';
          let msgStatus = 'success';
          if(item.status==='N'){
            msg = '已关闭';
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
      },
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding:5px 20px 30px;
    min-height: 100%;
    main {
      min-height: 100%;
    }
  }
  .park-sentry-container {
   
  }
  .top-part {
    margin-bottom:15px;
  }
  .list-part {
    .item-part {
      padding:5px 0;
      .part-title {
        margin-bottom: 15px;
        padding-bottom: 15px;
        font-size: 18px;
        font-weight: 600;
        border-bottom: 2px dotted #ccc;
      }
    }
  }
 
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    .item {
      width:26%;
      min-width:330px;
      padding:15px 0 15px 20px;
      background-color: #fff;
      border-radius: 5px;
      margin-right:20px;
      margin-bottom: 15px;
      .title {
        text-align: center;
        padding:0 0 10px;
        border-bottom:  1px solid #eee;
      }
      .top {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px 0 10px;
        overflow: hidden;
        .img-area {
          width: 30%;
          padding-bottom: 30%;
          margin-right:6%;
          position: relative;
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
            .label {
              font-weight: 500;
              margin-right: 5px;
            }
            .txt {
              display: inline-block;
              width:60%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              vertical-align: middle;
            }
            p {
              margin:0;
            }
          }
        }
      }
      .bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding:15px 20px 0 0;
        border-top:1px dotted #ccc;
        .btn {
          border:1px solid #ccc;
          padding:5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }

  .pagination-part {
    padding: 10px 15% 5px 0;
    text-align: right;
  }
</style>

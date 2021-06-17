
<template>
  <div class="container park-container">
    <el-form ref="form" :model="form" label-width="180px" :disabled="sign=='info'">
      <el-form-item label="车场名称：">
        <el-input v-model="form.name" placeholder="请输入车场名称" size="medium" clearable></el-input>
      </el-form-item>
      <el-form-item label="车场地址：">
        <el-input v-model="form.address" placeholder="请输入车场地址" size="medium" clearable></el-input>
      </el-form-item>
      <el-form-item label="车场经度：">
        <el-input v-model="form.lon" placeholder="请输入车场经度" size="medium" clearable></el-input>
      </el-form-item>
      <el-form-item label="车场纬度：">
        <el-input v-model="form.lat" placeholder="请输入车场纬度" size="medium" clearable></el-input>
      </el-form-item>
      
      <el-form-item label="车场性质：">
        <el-select v-model="form.parkType" placeholder="请选择车场性质" style="width:100%" size="medium" >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总车位数：">
        <el-input v-model="form.space" placeholder="请输入总车位数" size="medium" type="number" clearable></el-input>
      </el-form-item>
      <el-form-item label="已安装智能锁车位数：">
        <el-input v-model="form.name" placeholder="请输入已安装智能锁车位数" size="medium" type="number" clearable></el-input>
      </el-form-item>
      <el-form-item label="带充电桩车位数：">
        <el-input v-model="form.name" placeholder="请输入带充电桩车位数" size="medium" type="number" clearable></el-input>
      </el-form-item>
      <el-form-item label="车场负责人：">
        <el-input v-model="form.admin" placeholder="请输入车场负责人" size="medium" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系电话：">
        <el-input v-model="form.tel" placeholder="请输入联系电话" size="medium" type="number" clearable></el-input>
      </el-form-item>
    </el-form>
    
    <div class="btn-part">
      <el-button type="primary" @click="editInfo">{{sign=='info'?'编辑':'保存'}}</el-button>
    </div>

  </div>
</template>

<script>
  import { putObj} from '@/api/park/park'
  import {tableOption} from '@/const/crud/car/blacklist'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Tenant',
    data() {
      return {
        form:{
          name:''
        },
        typeList:[
          {
            label:'地上',
            value:'1'
          },
          {
            label:'地下',
            value:'2'
          }
        ],
        sign:'info'
      }
    },
    methods: {
      //获取车场信息
      getList(page, params) {
        fetchPage().then(response => {
          this.tableData = response.data.data.records;
        }).catch(() => {

        })
      },
      //编辑车场信息
      editInfo(){
        if(this.sign == 'edit'){
          //当前状态是编辑状态--保存
          putObj(this.form).then(res=>{
            this.sign = 'info';
          })
        }else {
          this.sign = 'edit';
        };

      }
    }
  }
</script>

<style lang="scss">
.park-container {
  .el-form-item__label {
    font-weight: 600;
  }
  .btn-part{
    .el-button {
      width: 30%;
    }
  }
}  
</style>

<style lang="scss" scoped>
  .container {
    width:50%;
    padding:5% 0 0 5%;
    .btn-part {
      margin-top:30px;
      text-align: center;
    }
  }
</style>

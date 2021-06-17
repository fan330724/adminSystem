<template>
  <el-dialog
    :title="addSign === 'add'?'创建优惠券':'编辑优惠券'"
    :visible.sync="addShow"
    width="60%"
    top="10vh"
    :before-close="handleClose">
    <div>
      <div class="top">
        <el-radio-group v-model="couponForm.type" size="large">
          <el-radio-button label="1">立减劵</el-radio-button>
          <el-radio-button label="2">满减劵</el-radio-button>
          <el-radio-button label="3">代金券</el-radio-button>
          <el-radio-button label="4">打折券</el-radio-button>
        </el-radio-group>
      </div>

      <el-form :model="couponForm" :rules="rules" ref="couponForm" label-width="130px" class="couponForm">
        <h4>基本信息</h4>
        <el-form-item label="优惠券名称：" prop="name">
          <el-input v-model="couponForm.name" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="关联活动：" prop="project">
          <el-select v-model="couponForm.project" placeholder="请选择活动区域">
            <el-option label="活动一" value="shanghai"></el-option>
            <el-option label="活动二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用门槛：" prop="region">
          <span v-if="couponForm.type === '1' || couponForm.type === '3'">无限制</span>
          <div class="term-part" v-else-if="couponForm.type === '2'">
            <span>满</span>
            <el-form-item prop="price1" class="cum-form-pirce">
              <el-input v-model="couponForm.price1" placeholder="输入金额"></el-input>
            </el-form-item>
            
            <span>元，减</span>
            <el-form-item prop="price2" class="cum-form-pirce">
              <el-input v-model="couponForm.price2" placeholder="输入金额"></el-input>
            </el-form-item>
            
            <span>元</span>
          </div>

          <div v-else-if="couponForm.type === '4'">
              <el-radio-group v-model="couponForm.termType">
                <el-radio label="1">无限制</el-radio>
                <el-radio label="2">
                  <div class="term-part radio-part">
                    <span class="first-span">满</span>
                    <el-form-item prop="price1" class="cum-form-pirce">
                      <el-input v-model="couponForm.price1" placeholder="输入金额"></el-input>
                    </el-form-item>
                    <span>元可使用</span>
                  </div>
                </el-radio>
              </el-radio-group>
          </div>

        </el-form-item>

        <el-form-item label="折扣：" prop="discount">
          <div class="term-part">
            <el-input v-model.number="couponForm.discount" placeholder="最低98，最高不超过20" style="width:18%;min-width:180px"></el-input>
            <span>折</span>
          </div>
         
        </el-form-item>

        <el-form-item label="总发行量：" prop="amount">
          <div class="term-part">
            <el-input v-model.number="couponForm.amount" placeholder="只能输入正整数" style="width:16%;min-width:150px"></el-input>
            <span>张</span>
          </div>
        </el-form-item>

        <el-form-item label="领取用户：" prop="drawUser">
          <el-checkbox-group v-model="couponForm.drawUser">
            <el-checkbox label="1">新注册用户</el-checkbox>
            <el-checkbox label="2">全部用户</el-checkbox>
            <el-checkbox label="3">plus年卡用户</el-checkbox>
            <el-checkbox label="4">plus月卡用户</el-checkbox>
            <el-checkbox label="5">首次消费用户</el-checkbox>
            <el-checkbox label="6">二次消费用户</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="领取方式：" prop="drawType">
          <el-radio-group v-model="couponForm.drawType" size="small">
            <el-radio label="1" border>系统发放</el-radio>
            <el-radio label="2" border>手动领取</el-radio>
          </el-radio-group>
        </el-form-item>

        <h4>使用时间</h4>

        <el-form-item label="有效日期：" required>
          <div class="time-row">
            <el-form-item prop="date1" class="cum-form-item">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="couponForm.date1" ></el-date-picker>
            </el-form-item>

            <span class="line">-</span>

            <el-form-item prop="date2" class="cum-form-item">
              <el-date-picker type="date" placeholder="选择结束日期" v-model="couponForm.date2" ></el-date-picker>
            </el-form-item>
          </div>
        </el-form-item>

        <el-form-item label="可用时段：" prop="useTime">
          <el-radio-group v-model="couponForm.useTime" size="small">
            <el-radio label="1" border>全部时段</el-radio>
            <el-radio label="2" border>部分时段</el-radio>
          </el-radio-group>
        </el-form-item>

        <h4>使用条件</h4>

        <el-form-item label="可使用车场：" prop="usePark">
          <el-checkbox-group v-model="couponForm.usePark">
            <el-checkbox label="1">全部停车场</el-checkbox>
            <el-checkbox label="2">全部洗车店</el-checkbox>
            <el-checkbox label="3">帷幄商城</el-checkbox>
            <el-checkbox label="4">指定使用范围</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="优惠叠加：" prop="overlying">
          <el-radio-group v-model="couponForm.overlying" size="small">
            <el-radio label="1" border>不可叠加其他优惠</el-radio>
            <el-radio label="2" border>可叠加其他优惠</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="提前预约：" prop="order">
          <el-radio-group v-model="couponForm.order" size="small">
            <el-radio label="1" border>不可叠加其他优惠</el-radio>
            <el-radio label="2" border>可叠加其他优惠</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="使用规则：" prop="useRule">
          <el-input type="textarea" v-model="couponForm.useRule"></el-input>
        </el-form-item>

      </el-form>
      <div>

      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="mutations.changeAddShow">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {state, mutations} from '../state'
  export default {
    data(){
      var validateDiscount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if(Number(value)>98 || Number(value) < 20){
            callback(new Error('折扣值在20~98之间'));
          } 
          callback();
        }
      };
      return {
        couponForm:{},
        rules:{
          name:[
            { required: true, message: '优惠券名称不能为空'}
          ],
          project:[
            { required: true, message: '请选择关联活动', trigger: 'change'}
          ],
          discount:[
            { required: true, message: '折扣值不能为空'},
            { type: 'number', message: '折扣为数字值'},
            { validator: validateDiscount, trigger: 'blur' }
          ],
           amount: [
            { required: true, message: '发行数量不能为空'},
            { type: 'number', message: '发行数量为数字值'}
          ],
          price1: [
            { required: true, message: '请输入金额'}
          ],
           price2: [
            { required: true, message: '请输入金额'}
          ],
          drawUser:[
            { required: true, message: '请选择领取用户', trigger: 'change'}
          ],
          drawType:[
            { required: true, message: '请选择用户类型', trigger: 'change'}
          ],
          date1:[
            { required: true, message: '请选择开始时间', trigger: 'change'}
          ],
          date2:[
            { required: true, message: '请选择结束时间', trigger: 'change'}
          ],
          useTime:[
            { required: true, message: '请选择可用时段', trigger: 'change'}
          ]
          
        },
        mutations
      }
    },
    computed:{
      addShow(){
        return state.addShow;
      },
      addSign(){
        return state.addSign;
      }
    },
    watch:{
      addShow(newV,oldV){
        if(newV){
          if(this.addSign === 'add'){
            this.couponForm = {
              type:'1',
              drawUser:[],
              drawType:'1'
            }
          }
        }else {}
        this.$refs['couponForm'].resetFields();
      }
    },
    methods:{
      handleClose(){
        this.mutations.changeAddShow();
      },
      /**
       * 提交表单数据
       */
      submitForm(){
        this.$refs['couponForm'].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style lang='scss' scoped>
  .top {
    margin-bottom: 20px;
  }
  h4 {
    margin-bottom: 20px;
    font-size: 16px;
  }
  .term-part {
    span {
      padding:0 10px;
    }
  }
  .cum-form-pirce {
    width:14%;
    min-width:100px;
    display: inline-block;
  }
  .radio-part {
    display: inline-block;
    .first-span {
      padding-left:0;
    }
  }
  .time-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    .cum-form-item {
      margin-bottom: 0 !important;
    }
    .line {
      display: flex;
      justify-content: center;
      align-items: center;
      padding:0 10px;
    }
  }
</style>
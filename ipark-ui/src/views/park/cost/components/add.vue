<template>
    <el-dialog
    :title="title"
    :visible.sync="sign"
    width="40%"
    :before-close="handleClose">
        
        <el-form ref="form" :model="form" :rules="rules" label-width="110px" :disabled="status==='info'" class="park-cost-add">
            <el-form-item label="计费方式" prop="type">
                <el-radio-group v-model="form.type">
                <el-radio label="1">按时计费</el-radio>
                <el-radio label="2">按时段计费</el-radio>
                <!-- <el-radio label="按次数计费"></el-radio> -->
                </el-radio-group>
            </el-form-item>

            <el-form-item label="车辆类型" prop="carType">
                <el-radio-group v-model="form.carType" class="cum-radio-group">
                    <el-radio v-for="(item,index) in carTypeList" :label="item.id" :key="index">{{item.name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            
            <el-form-item label="免费时长" prop="freeTime">
                <el-input v-model="form.freeTime">
                    <template slot="append">分钟</template>
                </el-input>
            </el-form-item>

            <el-form-item label="免费时长收费" prop="existFreePrice">
                <el-switch
                    v-model="form.existFreePrice"
                    active-color="#13ce66"
                    active-value="Y"
                    inactive-value="N"
                >
                </el-switch>
                <span class="example-span">例：免费时长30分钟，收费2.5元，开启后，超过30分钟不足一小时收费5元</span>
            </el-form-item>

            <el-form-item label="间隔时长" prop="intervalLength">
                <el-input v-model="form.intervalLength" type="number">
                    <template slot="append">分钟</template>
                </el-input>
            </el-form-item>
            <el-form-item label="间隔收费" prop="intervalPrice">
                <el-input v-model="form.intervalPrice" type="number">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>

            <el-form-item label="是否封顶" prop="existTop">
                <el-switch
                    v-model="form.existTop"
                    active-color="#13ce66"
                    active-value="Y"
                    inactive-value="N"
                    @change="changeExistTop">
                </el-switch>
            </el-form-item>

            <el-form-item label="封顶价格" prop="topPrice" v-if="form.existTop === 'Y'">
                <el-input v-model="form.topPrice" type="number" placeholder="封顶价格">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>

            <el-form-item label="首停时长" prop="firstTopLength" v-if="form.type!=='1'">
                <el-input v-model="form.firstTopLength" type="number">
                    <template slot="append">分钟</template>
                </el-input>
            </el-form-item>
            <el-form-item label="首段收费" prop="firstTopPrice" v-if="form.type!=='1'">
                <el-input v-model="form.firstTopPrice" type="number">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>

            <el-row v-if="form.type!=='1'">
                <el-col :span="14">
                    <el-form-item label="首段起止时间" prop="startTime" class="min-width:240px">
                        <el-time-select
                            placeholder="起始时间"
                            v-model="form.startTime"
                            :picker-options="{
                            start: '00:00',
                            step: '00:15',
                            end: '24:00'}"
                            style="width: 100%;min-width:120px">
                        </el-time-select>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="1" style="min-width:5px">-</el-col>
                <el-col :span="9">
                    <el-form-item prop="endTime" label-width="0">
                        <el-time-select
                            placeholder="结束时间"
                            v-model="form.endTime"
                            :picker-options="{
                            start: '00:00',
                            step: '00:15',
                            end: '24:00',
                            minTime: form.startTime}"
                            style="width: 100%;">
                        </el-time-select>
                    </el-form-item>
                </el-col>
            </el-row>
            

            <el-form-item label="所属停车场" prop="parkId">
                <el-select v-model="form.parkId" placeholder="请选择所属停车场" disabled>
                    <el-option v-for="(item,index) in simpleParkList" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="beforeSave" v-if="status!=='info'">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
  import state from '../state.js'
  import {mapGetters} from 'vuex'
  import {addObj, putObj} from '@/api/park/cost'
  export default {
    data() {
      return {
        dialogVisible: false,
        form: {type:'1',existFreePrice:'Y'},
        rules: {
          type: [
            { required: true, message: '请选择计费方式', trigger: 'change' },
          ],
          carType: [
            { required: true, message: '请选择车辆类型', trigger: 'change' },
          ],
        //   freeTime: [
        //     { required: true, message: '请填写免费时长', trigger: 'blur' },
        //   ],
          intervalLength: [
            { required: true, message: '请输入间隔时长', trigger: 'blur' }
          ],
          intervalPrice: [
            { required: true, message: '请输入间隔时长', trigger: 'blur' }
          ],
          firstTopLength: [
            { required: true, message: '请输入首停时长', trigger: 'blur' }
          ],
          firstTopPrice: [
            { required: true, message: '请输入首段收费', trigger: 'blur' }
          ],
          topPrice: [
            { required: true, message: '请输入封顶价格', trigger: 'blur' }
          ],
          startTime: [
            { required: true, message: '请选择开始时间', trigger: 'change' }
          ],
          endTime: [
            { required: true, message: '请选择结束时间', trigger: 'change' }
          ],
          parkId: [
            { required: true, message: '请选择所属停车场', trigger: 'change' }
          ],
        }
      };
    },
    computed:{
        ...mapGetters(['carTypeList','parkList','parkInfo']),
        simpleParkList(){
            return this.parkList.map(i=>{
                return {
                    label:i.name,
                    value:i.id
                }
            })
        },
        sign(){
            return state.addSign;
        },
        status(){
            return state.editStatus;
        },
        title(){
            let result = "编辑";
            if(state.editStatus ==='add'){
                result = "新增";
            }else if(state.editStatus ==='info'){
                result = "信息详情";
            }
            return result;
        }
    },
    watch:{
        sign(newV,oldV){
            if(newV){
                this.form = JSON.parse(JSON.stringify(state.item));
                if(this.status==='add'){
                    this.form.parkId = this.parkInfo.id;
                };
            }else{
                state.item = {type:'1',existTop:'N',status:'N',freeTime:0,existFreePrice:'Y'};
                this.$refs['form'].resetFields();
            }
        }
    },
    methods: {
        cancel(){
            state.addSign = false;
        },
        handleClose(){
            state.addSign = false;
        },
        beforeSave(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                     if(this.status ==='edit'){
                        this.save();
                    }else{
                        this.add();
                    }
                } else {
                    return false;
                }
            });
           
        },
        add(){
            let temp = JSON.parse(JSON.stringify(this.form));
            temp.parkId = "397040718163476480";
            addObj(temp).then(res=>{
                this.$message({
                    message: '新增成功',
                    type: 'success'
                });
                state.addSign = false;
                this.$emit('fresh');
            }).catch(err=>{
                this.$message({
                    message: '新增失败',
                    type: 'error'
                });
            })
        },
        save(){
            putObj(this.form).then(res=>{
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
                state.addSign = false;
                this.$emit('fresh')
            }).catch(err=>{
                this.$message({
                    message: '保存失败',
                    type: 'error'
                });
            })
        },
        changeExistTop(val){
            if(val === 'N'){
                this.form.topPrice = 0;
            }
        }
    }
  };
</script>

<style lang="scss">
    .park-cost-add {
        .cum-radio-group {
            .el-radio {
                margin-bottom: 15px;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .line {
        text-align: center;
        line-height: 30px;
    }
    .example-span {
        margin-left:40px;
        font-size: 13px;
        color:#909399;
    }
</style>
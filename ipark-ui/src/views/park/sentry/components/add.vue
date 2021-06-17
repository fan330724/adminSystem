<template>
    <el-dialog
    :title="title"
    :visible.sync="sign"
    width="30%"
    :before-close="handleClose">
        
        <el-form ref="form" :model="form" :rules="rules" label-width="140px" :disabled="status==='info'">
            <el-form-item label="岗亭名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="岗亭负责人" prop="liablePerson">
                <el-input v-model="form.liablePerson"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="liablePhone">
                <el-input v-model="form.liablePhone" type="number"></el-input>
            </el-form-item>
            <el-form-item label="是否在线：" v-if="status === 'info'">
                <span>{{form.exitOnline === 'Y'?'在线':'不在线'}}</span>
                <!-- <el-switch v-model="form.exitOnline" active-value="Y" inactive-value="N"></el-switch> -->
            </el-form-item>
            <el-form-item label="是否允许空牌车通行" prop="carType">
                <el-switch v-model="form.carType" active-value="Y" inactive-value="N"></el-switch>
            </el-form-item>
            <el-form-item label="是否开启" prop="status">
                <el-switch v-model="form.status" active-value="Y" inactive-value="N"></el-switch>
            </el-form-item>
            <el-form-item label="所属停车场" prop="parkId">
                <el-select v-model="form.parkId" placeholder="请选择所属停车场" disabled>
                    <el-option
                    v-for="item in parkSimpleList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
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
    import {addObj, putObj} from '@/api/park/sentry'
  export default {
    data() {
      return {
        dialogVisible: false,
        form: {},
        rules: {
          name: [
            { required: true, message: '请输入岗亭名称', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          liablePerson: [
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          liablePhone: [
            { min: 11, max: 11, message: '请正确输入手机号', trigger: 'blur' }
          ],
          parkId: [
            { required: true, message: '请选择所属停车场', trigger: 'change' }
          ],
        }
      };
    },
    computed:{
        ...mapGetters(['parkList','parkInfo']),
        parkSimpleList(){
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
                state.item = {
                    status:'Y',
                    exitOnline:'Y'
                }
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
                this.$emit('fresh');
            }).catch(err=>{
                this.$message({
                    message: '保存失败',
                    type: 'error'
                });
            })
        }
    }
  };
</script>

<style lang="scss" scoped>

</style>
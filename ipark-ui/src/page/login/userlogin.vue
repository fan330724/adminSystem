<template>
  <el-form
    ref="loginForm"
    :rules="loginRules"
    :model="loginForm"
    class="login-form"
    status-icon
    label-width="0"
  >
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.username"
        size="small"
        auto-complete="off"
        placeholder="请输入用户名"
        @keyup.enter.native="handleLogin"
      >
        <!-- <i slot="prefix" class="icon-yonghuming" /> -->
        <img src="../../../public/img/login/me-icon.png" class="user-img" alt="" slot="prefix"> 
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        :type="passwordType"
        v-model="loginForm.password"
        size="small"
        auto-complete="off"
        placeholder="请输入密码"
        @keyup.enter.native="handleLogin"
      >
        <i slot="suffix" class="el-icon-view el-input__icon" @click="showPassword" />
        <!-- <i slot="prefix" class="icon-mima"></i> -->
        <img src="../../../public/img/login/psd-icon.png" class="psd-img" alt="" slot="prefix"> 
      </el-input>
    </el-form-item>
    <el-form-item prop="tenantId">
      <el-input
        v-model="loginForm.tenantId"
        size="small"
        auto-complete="off"
        placeholder="请输入车场编号"
        @keyup.enter.native="handleLogin"
        @blur="changeTenantId"
      >
        <!-- <i slot="prefix" class="icon-yonghuming" /> -->
        <img src="../../../public/img/login/park-icon.png" class="park-img" alt="" slot="prefix"> 
      </el-input>
    </el-form-item>

    <Verify
      @success="verifySuccess"
      :mode="'pop'"
      :captchaType="'blockPuzzle'"
      :imgSize="{ width: '330px', height: '155px' }"
      ref="verify"
    />

    <el-form-item>
      <el-button
        type="primary"
        size="small"
        class="login-submit"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { randomLenNum } from "@/util/util";
import { mapGetters } from "vuex";
import { getCode } from "@/api/code";
import { setStore, getStore } from '@/util/store'
import Verify from "@/components/verifition/Verify";

export default {
  name: "Userlogin",
  components: {
    Verify,
  },
  data() {
    return {
      socialForm: {
        code: "",
        state: "",
      },
      loginForm: {
        username: "",
        password: "",
        tenantId:'', //租户id
        code: "",
        randomStr: "blockPuzzle",
      },
      checked: false,
      code: {
        src: undefined,
        len: 4,
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" },
        ],
        tenantId:[
          { required: true, message: "请输入车场编号", trigger: "blur" }
        ],
      },
      tenantIdRule:
          { required: true, message: "请输入租户id", trigger: "blur" }
        ,
      passwordType: "password",
    };
  },
  computed: {
    ...mapGetters(["tagWel"]),
  },
  created(){
    this.loginForm.tenantId = getStore({ name: 'tenantId' })
  },
  methods: {
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$refs.verify.show();
        }
      });
    },
    verifySuccess(params) {
      this.loginForm.code = params.captchaVerification;
      console.log(this.tagWel)
      this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
        this.$router.push({ path: this.tagWel.value });
      });
    },
    /**
     * 监听租户id变化
     */
    changeTenantId(){
      let val = this.loginForm.tenantId;
      if(val || val === 0){
        setStore({ name: 'tenantId', content: val })
      }
    }
  },
};
</script>

<style>

</style>

<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div
        v-if="showCollapse"
        :class="[{ 'avue-breadcrumb--active': isCollapse }]"
        class="avue-breadcrumb">
        <i
          class="icon-navicon"
          @click="setCollapse"/>
      </div>
    </div>
    <div class="top-bar__title">
      <div
        v-if="showMenu"
        class="top-bar__item top-bar__item--show">
        <top-menu/>
      </div>
    </div>
    <div class="top-bar__right">
      <el-tooltip
        v-if="showColor"
        effect="dark"
        content="主题色"
        placement="bottom">
        <div class="top-bar__item">
          <top-color/>
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="showDebug && roles && roles.length && roles.indexOf(1) > -1"
        :content="logsFlag?'没有错误日志':`${logsLen}条错误日志`"
        effect="dark"
        placement="bottom">
        <div class="top-bar__item">
          <top-logs/>
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="showLock"
        effect="dark"
        content="锁屏"
        placement="bottom">
        <div class="top-bar__item">
          <top-lock/>
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="showTheme"
        effect="dark"
        content="特色主题"
        placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-theme/>
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="showFullScreen"
        :content="isFullScreen?'退出全屏':'全屏'"
        effect="dark"
        placement="bottom">
        <div class="top-bar__item">
          <i
            :class="isFullScreen?'icon-zuixiaohua':'icon-quanpingzuidahua'"
            @click="handleScreen"/>
        </div>
      </el-tooltip>
      <div class="duty-part">
        <el-button type="warning" @click="onDuty" icon="el-icon-s-flag" :loading="shakeSign" class="duty-btn">
          上岗
          <!-- <i class="el-icon-s-flag el-icon--right"></i> -->
        </el-button>
      </div>
       
      <el-tooltip
        v-if="userInfo.avatar"
        effect="dark"
        content="用户头像"
        placement="bottom">
        <div class="top-bar__img">        
          <i class="el-icon-user-solid "></i>
        </div>

        <!-- <img
          id="thumbnail"
          class="top-bar__img"> -->
      </el-tooltip>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.username }}
          <i class="el-icon-arrow-down el-icon--right"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link to="/info/index">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="$refs.seting.open()">界面设置
          </el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="logout">退出系统
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <top-setting ref="seting"/>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { fullscreenToggel, handleImg, listenfullscreen } from '@/util/util'
import { gateDuty } from '@/api/park/park'
import topLock from './top-lock'
import topMenu from './top-menu'
import topTheme from './top-theme'
import topLogs from './top-logs'
import topColor from './top-color'
import topSetting from './top-setting'

export default {
  name: 'Top',
  components: {
    topLock,
    topMenu,
    topTheme,
    topLogs,
    topColor,
    topSetting
  },
  filters: {},
  data() {
    return {
      shakeSign:false
    }
  },
  computed: {
    ...mapState({
      showDebug: state => state.common.showDebug,
      showTheme: state => state.common.showTheme,
      showLock: state => state.common.showLock,
      showFullScreen: state => state.common.showFullScreen,
      showCollapse: state => state.common.showCollapse,
      showMenu: state => state.common.showMenu,
      showColor: state => state.common.showColor
    }),
    ...mapGetters([
      'userInfo',
      'roles',
      'isFullScreen',
      'tagWel',
      'tagList',
      'isCollapse',
      'tag',
      'logsLen',
      'logsFlag'
    ])
  },
  created() {
    handleImg(this.userInfo.avatar, 'thumbnail')
  },
  mounted() {
    listenfullscreen(this.setScreen)
  },
  methods: {
    handleScreen() {
      fullscreenToggel()
    },
    setCollapse() {
      this.$store.commit('SET_COLLAPSE')
    },
    setScreen() {
      this.$store.commit('SET_FULLSCREEN')
    },
    logout() {
      this.$confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
            this.$router.push({ path: '/login' })
        })
      })
    },
    /**
     * 上岗
     */
    onDuty(){
      if(this.shakeSign){
        return
      };
      this.shakeSign = true;
      gateDuty().then(res=>{
        console.log(res,'res');
        if(res.data && res.data.code === 0){
          this.$notify({
            title: '成功',
            message: '上岗成功',
            duration: 2000,
            type: 'success'
          })
        }else{
          throw '';
        }
        this.shakeSign = false;
      }).catch(err=>{
        this.shakeSign = false;
        this.$notify({
            title: '失败',
            message: '上岗失败，稍后重试',
            duration: 2000,
            type: 'error'
          })
      })
    }
  }
}
</script>

<style lang="scss">
  .duty-part {
    margin:0 15px;
    margin-top: -10px;
    i {
      line-height: 100% !important; 
    }
    span {
      font-size: 13px;
    }
    .duty-btn {
      // background-color: #FFC600;
      // border-color: #FFC600;
    }
  }
</style>

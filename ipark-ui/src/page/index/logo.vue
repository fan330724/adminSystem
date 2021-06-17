<template>
  <div class="avue-logo">
    <!-- <transition name="fade">
      <span v-if="keyCollapse" key="0" class="avue-logo_subtitle" @click="goIndex">
        {{website.subtitle}}
      </span>
    </transition> -->
    <transition-group name="fade">
      <!-- <span v-if="!keyCollapse" key="1" class="avue-logo_title" @click="goIndex">
        {{ website.title }}
      </span> -->
      <div key="1">
        <div v-if="parkList.length>1">
          <el-select v-model="curParkId" placeholder="请选择" @change="changeParkId">
            <el-option
              v-for="item in simpleParkList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div v-else>
          <el-tooltip class="item" effect="light" :content="parkInfo.name" placement="bottom">
            <span class="logo-title" v-if="!keyCollapse">{{parkInfo.name || ''}}</span>
            <span class="avue-logo_subtitle" v-if="keyCollapse">{{parkInfo.name.substr(0,1) || ''}}</span>
          </el-tooltip>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Logo',
  inject: ['Index'],
  data(){
    return {
      curParkId:''
    }
  },
  computed: {
    ...mapGetters(['website', 'keyCollapse','parkInfo','parkList']),
    simpleParkList(){
      let tempList = this.parkList.map(i=>{
        return {
          name:i.name,
          id:i.id
        }
      })
      return tempList;
    },
    parkId(){
      return this.parkInfo.id;
    }         
  },
  watch:{
    parkId(newV,oldV){
      if(newV){
        this.curParkId = newV;
      }
    }
  },
  created(){
    if(this.parkInfo && this.parkInfo.id){
      this.curParkId = this.parkInfo.id || '';
    }
  },
  methods: {
    goIndex: function () {
      window.location.href = '/'
    },
    /**
     * 切换车场
     */
    changeParkId(){
      let temp = this.parkList.filter(i=>{return i.id ===this.curParkId})[0] || {};
      this.$store.commit("SET_PARKINFO", temp);
      this.$store.dispatch("GetCarType", this.curParkId);
      this.Index.reload();
    }
  }
}
</script>

<style lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.avue-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 64px;
  line-height: 64px;
  background-color: #20222a;
  font-size: 20px;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: rgba(255, 255, 255, 0.8);
  z-index: 1024;
  display: flex;
  justify-content: center;
  align-items: center;
  &_title {
    display: block;
    text-align: center;
    font-weight: 300;
    font-size: 16px;
  }
  &_subtitle {
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
}

.avue--collapse .avue-logo {
  padding:0 10px;
}
</style>

<style lang="scss" scoped>
  .logo-title {
    display: block;
    text-align: center;
    width:12.5vw;
    padding:0 5px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color:#fff;
  }
</style>

<template>
  <div class="avue-sidebar">
    <logo/>
    <el-scrollbar style="height:100%">
      <div
        v-if="validatenull(menu)"
        class="avue-sidebar--tip">没有发现菜单</div>
               
      <el-menu
        :show-timeout="200"
        :collapse="keyCollapse"
        unique-opened
        :default-active="nowTagValue"
        :default-openeds="openList"
        mode="vertical">
        <sidebar-item
          :menu="menu"
          :screen="screen"
          :props="website.menu.props"
          :collapse="keyCollapse"
          first/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logo from '../logo'
import sidebarItem from './sidebarItem'
export default {
  name: 'Sidebar',
  inject: ["Index"],
  components: { sidebarItem, logo },
  created() {
    // console.log(this.menu);
    let menuItem = {};
    // if(this.menu && this.menu.length>0){
    //   let list = this.menu.filter(i=>{return (i.children && i.children.length>0)});
    //   if(list.length>0){
    //     menuItem = list[0];
    //   }
    // }
    this.Index.openMenu({item:menuItem});
  },
  data() {
      return {
        openList:[]
      }
    },
  computed: {
    ...mapGetters(['website', 'menu', 'tag', 'keyCollapse', 'screen']),
    nowTagValue: function() {
    let result = this.$router.$avueRouter.getValue(this.$route); 
    if(result ==='/wel/index'){
      this.openList =[]
    }
      return result;
    }
  }
}
</script>



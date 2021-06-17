<template>
  <div class="top-menu">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      text-color="#333"
      active-text-color="#FFF"
    >
      <template v-for="(item, index) in items">
        <el-menu-item
          :index="item.id + ''"
          :key="index"
          @click.native="openMenu(item)"
        >
          <template slot="title">
            <i :class="item.icon" />
            <span>{{ item.label }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TopMenu",
  inject: ["Index"],
  data() {
    return {
      activeIndex: "0",
      items: [],
      curPath: "",
    };
  },
  created() {
    // 显示顶部菜单
    this.getTopMenu();
    // 用户权限加载
    this.getUserInfo();
  },
  computed: {
    ...mapGetters(["menu"]),
  },
  methods: {
    getTopMenu() {
      this.$store.dispatch("GetTopMenu").then((res) => {
        this.items = res || [];
        this.activeIndex = String(res[0].id);
      });
    },
    openMenu(item) {
      if (item.path === this.curPath) {
        //重复点击当前页面
        return;
      }
      this.curPath = item.path;
      let temp = { type: true };
      if (item.path === "/wel/index") {
        temp.type = undefined;
        temp.item = {};
      }
      temp.item = JSON.parse(JSON.stringify(item));
      this.Index.openMenu(temp);
    },
    getUserInfo() {
      // 更新sessionStore 权限信息
      this.$store.dispatch("GetUserInfo");
    },
  },
};
</script>

<style >
.el-menu--horizontal>.el-menu-item{
  height: 63.5px !important;
  line-height: 64px !important;
}
</style>

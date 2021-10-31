<template>
  <!--  背景颜色：此备注说明用，实际开发需要删除，否则报错 -->
  <!-- 字体颜色：此备注说明用，实际开发需要删除，否则报错 -->
  <!-- 只打开一个菜单：此备注说明用，实际开发需要删除，否则报错 -->
  <div class="nav_box">
    <div
      class="tools"
      :style="!isCollapse ? unCollapse : collapse"
      @click="toggleClick"
    >
      <i :class="icon"></i>
    </div>
    <!--     router -->
    <el-menu
      @select="handleSelect"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#185350"
      text-color="#fff"
      text-active-color="#3ecbd5"
      :unique-opened="false"
    >
      <navBarItem :routerList="routers"></navBarItem>
    </el-menu>
  </div>
</template>



<script>
import navBarItem from "./navBarItem"; //引进菜单模板
export default {
  data() {
    return {
      isCollapse: false, //菜单展开功能
      unCollapse: {
        width: "200px",
      },
      collapse: {
        width: "64px",
      },
      unCollapseMain: {
        paddingLeft: "220px",
      },
      collapseMain: {
        paddingLeft: "50px",
      },
    };
  },
  components: {
    navBarItem,
  },
  computed: {
    routers() {
      return this.$router.options.routes[2].children;
    },
    icon: function () {
      return this.isCollapse ? "el-icon-right" : "el-icon-back";
    },
  },
  methods: {
    toggleClick() {
      this.isCollapse = !this.isCollapse;
    },
    handleSelect(key, key1, routeObj) {
      console.log(key, "000", key1, "111", routeObj);
      let name = routeObj.$el.dataset.name;
      this.$router.push({ name: name });
    },
  },
};
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.tools {
  cursor: pointer;
  text-align: center;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  color: pink;
  background-color: #185350;
  margin-bottom: 1px;
}
.nav_box {
  width: 200px;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
::v-deep .el-menu {
  flex: 1 !important;
}
</style>
 
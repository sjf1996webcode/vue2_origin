<template>
  <div class="home">
    <div class="top">
      <topNav/>
    </div>
    <div class="main">
      <navBar />
      <div class="main_content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar/navBar.vue";
import topNav from "@/components/topNav.vue";
export default {
  name: "Home",
  components: {
    navBar,
    topNav
  },
};
</script>
<style scoped lang="scss">
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  .top {
    height: 64px;
    // background-color: #185350;
  }
  .main {
    flex: 1;
    margin-top: 1px;
    display: flex;
    justify-content: space-between;
    .main_content {
     flex: 1;
    }
  }
}
</style>

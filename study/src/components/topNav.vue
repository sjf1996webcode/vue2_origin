<template>
  <div class="top_nav">
    <div class="left_info">
      <h1>某某后台管理系统</h1>
    </div>
    <div class="right_user_info">
      <div class="outer_user">
        <div class="user_icon"></div>
        <div class="user_name">用户</div>
      </div>
      <div class="login_out">退出登录</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.top_nav {
  background-color: #185350;
  height: 64px;
  line-height: 64px;
  color: #fff;
  padding-left: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left_info {
      cursor: pointer;
  }
  .right_user_info {
    margin-right: 24px;
    display: flex;
    justify-content: flex-end;
    .outer_user {
      display: flex;
      flex-flow: column;
      justify-content: center;
      margin-right: 6px;
       cursor: pointer;
      .user_icon {
        width: 36px;
        height: 36px;
        background-color: #fff;
        border-radius: 50%;
      }
      .user_name {
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        padding-top: 2px;
      }
    }
    .login_out {
      font-size: 16px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
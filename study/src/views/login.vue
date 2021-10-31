<template>
  <div class="page_login">
    <el-card class="login_content">
      <div class="login_title">后台管理</div>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="0px"
        class="demo-loginForm"
      >
        <el-form-item label="" prop="name">
          <el-input v-model="loginForm.name" clearable>
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="loginForm.password" type="password" clearable>
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="submit_box">
        <el-button type="primary" class="submit" @click="submitForm()"
          >登 录</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  methods: {
    ...mapMutations(["set_TOKEN"]),
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let time = new Date().getTime();
          this.set_TOKEN(time);
          this.$router.push({name:"Home"})
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page_login {
  width: 100vw;
  height: 100vh;
  background-color: #fcc;

  .login_content {
    width: 420px;
    height: 300px;
    position: absolute;
    right: 16%;
    top: 50%;
    transform: translateY(-50%);
    .login_title {
      font-size: 24px;
      text-align: center;
      height: 48px;
      line-height: 48px;
    }
    .submit_box {
      display: flex;
      justify-content: flex-end;
      .submit {
        width: 420px;
      }
    }
  }
}
</style>
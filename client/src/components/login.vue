<template>
  <div class="login">
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { get, post } from "../network/request";
export default {
  data() {
    return {
      form: {
        username: "",
        pwd: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      await post("/users/login", {
        username: this.form.username,
        pwd: this.form.pwd
      }).then(
        res => {
          const result = res.data;
          if (result.status == 404) {
            this.$message.error("登录失败，请重新登录");
            this.form.username = "";
            this.form.pwd = "";
          } else if (result.status == 200) {
            sessionStorage.setItem("token", "true");
            this.$message({
              message: "登录成功，正在跳转",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push("/main");
            }, 1000);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    reset() {
      this.form.username = "";
      this.form.pwd = "";
    }
  }
};
</script>
<style scoped>
</style>

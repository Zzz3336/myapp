<template>
  <div class="login">
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px" :rules="loginRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">登录</el-button>
          <el-button @click="reset('form')">重置</el-button>
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
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post("/users/login", {
            username: this.form.username,
            pwd: this.form.pwd
          }).then(
            res => {
              const result = res.data;
              // console.log(result.tokenKey);
              if (result.status == 404) {
                this.$alert("登录失败，请重新登录", "提示", {
                  confirmButtonText: "确定"
                });
                this.form.username = "";
                this.form.pwd = "";
              } else if (result.status == 200) {
                // localStorage.setItem("token", result.tokenKey);
                const token = result.tokenKey;
                // 将token提交到store
                this.$store.commit("updateToken", token);
                this.$message({
                  message: "登录成功，正在跳转",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/main",
                    query: { username: this.form.username }
                  });
                }, 1000);
              }
            },
            err => {
              console.log(err);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    reset(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
</style>

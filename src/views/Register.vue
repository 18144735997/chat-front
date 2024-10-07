<template>
  <div class="login-container">
    <div className="login-background-container">
      <div className="login-background">
        <div
            className="login-background__shape login-background__shape--1"
        ></div>
        <div
            className="login-background__shape login-background__shape--2"
        ></div>
      </div>
    </div>
    <div class="login-form-container">
      <div class="login-form">
        <div class="login-form-title">
          <p>用户注册</p>
          <el-link type="primary" @click="toLogin" :underline="false">
            前往登录 ->
          </el-link>
        </div>
        <el-form :model="registerForm" class="form" label-width="80">
          <el-input v-model="registerForm.account" placeholder="用户名">
            <template #prefix>
              <MyIcon icon="user"/>
            </template>
          </el-input>
          <el-input v-model="registerForm.nick" placeholder="昵称">
            <template #prefix>
              <MyIcon icon="user"/>
            </template>
          </el-input>
          <el-select
              v-model="registerForm.type"
              placeholder="权限"
              style="width: 100%"
          >
            <el-option
                v-for="per in permissions"
                :label="per.label"
                :value="per.value"
            />
          </el-select>
          <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="密码"
          >
            <template #prefix>
              <MyIcon icon="lock"/>
            </template>
          </el-input>
          <el-button
              style="width: 100%; height: 60px; font-size: 20px"
              type="primary"
              @click="submit"
          >
            注册
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import LogInApi from "@/api/module/login";
import {ElNotification} from "element-plus";

const router = useRouter();

const toLogin = () => {
  router.push({
    path: "/login",
  });
};

const permissions = [
  {
    label: "普通用户",
    value: "0",
  }
];

const registerForm = ref({
  account: "",
  nick: "",
  type: "0",
  password: "",
});

const submit = async () => {
  const [err, res] = await LogInApi.Register(registerForm.value);
  if (!err && res) {
    if (res.retCode === "00") {
      registerForm.value.account = ""
      registerForm.value.nick = ""
      registerForm.value.password = ""
      await router.push({
        path: "/login",
      });
      ElNotification({
        title: "成功",
        message: "返回登录页面",
        type: "success",
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("../assets/css/login.scss");
</style>

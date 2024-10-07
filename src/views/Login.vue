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
          <p>用户登录</p>
          <el-link type="primary" @click="toRegister" :underline="false">
            前往注册 ->
          </el-link>
        </div>
        <el-form :model="loginForm" class="form" label-width="80">
          <el-input v-model="loginForm.account" placeholder="用户名">
            <template #prefix>
              <MyIcon icon="user"/>
            </template>
          </el-input>
          <el-input
              v-model="loginForm.password"
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
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import Cookies from "js-cookie";
import LogInApi from "@/api/module/login";
import {ElNotification} from "element-plus";
import MyIcon from "@/components/MyIcon.vue";
import {useUserStore} from "@/stores/user";
import {useKeyPress} from "vue-hooks-plus";
import {useWebsocketStore} from "@/stores/websocketStores";

// 路由
const router = useRouter();

// 用户仓库
const userStore = useUserStore();
const websocketStore = useWebsocketStore();
const toRegister = () => {
  router.push({
    path: "/register",
  });
};

const loginForm = ref({
  account: "",
  password: "",
});
const submit = async () => {
  const [err, res] = await LogInApi.Log(loginForm.value);
  if (!err && res) {
    if (res.retCode === "00") {
      loginForm.value.account = ""
      loginForm.value.password = ""
      ElNotification({
        title: res.retMsg,
        message: "登录成功",
        type: "success",
      });
      Cookies.set(
          "userInfo",
          JSON.stringify({
            id: res.id,
            account: res.account,
            nick: res.nick,
            type: res.type,
          })
      );
      userStore.saveUserInfo(res);
      await router.push({
        path: "/home",
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("../assets/css/login.scss");
</style>

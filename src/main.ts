// elementPlus 汉化
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { config } from "./config";

// 配置
window.document.title = config.title;

// 图标
import "./assets/icon/iconfont.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.provide("config", config);

app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});

app.mount("#app");

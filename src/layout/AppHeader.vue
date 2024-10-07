<template>
  <div class="app-header">
    <!-- 折叠导航栏相关 -->
    <div class="header-left">
      <MyIcon
          :title="isCollapse ? '展开' : '折叠'"
          :icon="isCollapse ? 'indent' : 'outdent'"
          style="margin-right: 12px; cursor: pointer"
          @click="handleIcon"
      />
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="bread in breadList">
          {{ bread }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <el-space>
        <MyIcon
            :title="isFullscreen ? '退出全屏' : '进入全屏'"
            :icon="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"
            style="margin-right: 12px; cursor: pointer"
            @click="toggleFullscreen"
        />
        <el-avatar :size="18">
          <MyIcon icon="user"/>
        </el-avatar>
        <div class="header-username">
          {{ userStore.nick }}
        </div>
        <el-link type="primary" @click="logout">登出</el-link>
      </el-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 折叠导航栏相关
import {useMedia, useFullscreen} from "vue-hooks-plus";
import {useMenuStore} from "@/stores/menu";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import {ref, watchEffect} from "vue";
import MyIcon from "@/components/MyIcon.vue";

const menuStore = useMenuStore();
const userStore = useUserStore();
const {isCollapse, breadList} = storeToRefs(menuStore);
const handleIcon = () => {
  menuStore.collapse(!isCollapse.value);
};
const value = useMedia(["(min-width: 1536px)"], [false], true);
const [isFullscreen, {toggleFullscreen}] = useFullscreen();
const ws = useWebsocketStore();
import {useRoute, useRouter} from "vue-router";
import {useWebsocketStore} from "@/stores/websocketStores";
import {useChatWebsocketStore} from "@/stores/chatWebsocketStores";
const chatWs = useChatWebsocketStore();
const route = useRoute();
const router = useRouter();

const logout = () => {
  router.push({
    path: "/login",
  });
  ws.close();
  chatWs.close()
  userStore.logout();
};

watchEffect(() => {
  menuStore.collapse(value.value);
  menuStore.updateBreadList(route.path);
});
</script>

<style lang="scss" scoped>
.app-header {
  height: $app-header-height;
  padding: 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  // background-color: yellow;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-left {
    display: flex;
    align-items: center;
  }

  .header-right {
    display: flex;
    align-items: center;

    .header-username {
      width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>

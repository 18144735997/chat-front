<template>
  <div class="app-container">
    <AppSide :isCollapse="isCollapse" />
    <div class="app-main-container" :class="{ collapse: isCollapse }">
      <AppHeader />
      <div class="app-main">
        <router-view v-slot="{ Component }">
          <keep-alive exclude="SystemLog">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSide from "../layout/AppSide.vue";
import AppHeader from "../layout/AppHeader.vue";
import { useMenuStore } from "../stores/menu";
import { storeToRefs } from "pinia";

const menuStore = useMenuStore();
// menuStore.init(list);
const { isCollapse } = storeToRefs(menuStore);
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;

  .app-main-container {
    width: calc(100vw - $app-side-width);

    &.collapse {
      width: calc(100vw - $app-side-collapse-width);
    }

    .app-main {
      height: calc(100vh - $app-header-height);
      padding: 10px 20px;
      overflow: auto;
      &::-webkit-scrollbar-track-piece {
        background: #e2e2e2;
      }

      &::-webkit-scrollbar {
        width: 0px; // 横向滚动条
        height: 0px; // 纵向滚动条 必写
      }

      &::-webkit-scrollbar-thumb {
        background: #b1b1b1;
        border-radius: 20px;
      }
    }
  }
}
</style>

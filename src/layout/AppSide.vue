<template>
  <div class="app-side" :class="{ collapse: isCollapse }">
    <div class="side-top">
      <div>{{ isCollapse ? "" : title }}</div>
    </div>
    <div class="side-main" :class="{ collapse: isCollapse }">
      <el-menu
        :default-active="route.path"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <side-menu :menuList="menuList" />
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SideMenu from "@/components/SideMenu.vue";
import { useMenuStore } from "@/stores/menu";
import { storeToRefs } from "pinia";
import { inject } from "vue";
import { useRoute } from "vue-router";
defineProps<{
  isCollapse: boolean;
}>();
const route = useRoute();
const menuStore = useMenuStore();
const { menuList } = storeToRefs(menuStore);

const { title } = inject<any>("config");
</script>

<style lang="scss" scoped>
:deep(.el-menu) {
  --el-menu-bg-color: #374469;
  --el-menu-hover-bg-color: #5279eb;
  .el-sub-menu__title {
    color: $app-side-text-color;
  }
  .el-menu-item {
    color: $app-side-text-color;
    &.is-active {
      background-color: $app-side-active-color;
    }
  }
}

.app-side {
  height: 100%;
  width: $app-side-width;
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  background-color: $app-side-bg-color;
  display: flex;
  flex-direction: column;

  &.collapse {
    width: $app-side-collapse-width;
    border-right: 1px solid rgba(0, 0, 0, 0.5);
  }

  .side-top {
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: $app-header-height;
    line-height: $app-header-height;
    font-size: 24px;
  }
  .side-main {
    flex: 1;
    width: 100%;

    &.collapse {
      display: none;
    }

    .el-menu {
      border: none;
    }
  }
}
</style>

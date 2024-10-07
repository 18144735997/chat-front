<template>
  <template v-for="item in newList">
    <template v-if="true">
      <el-sub-menu
          v-if="item.children && item.children.length !== 0"
          :index="item.path"
      >
        <template #title>
          <MyIcon v-if="item.icon" :icon="item.icon"/>
          <span style="margin-left: 6px">{{ item.title }}</span>
        </template>
        <side-menu :menu-list="item.children"/>
      </el-sub-menu>
      <el-menu-item v-else @click="handleNavigate" :index="item.path">
        <MyIcon v-if="item.icon" :icon="item.icon"/>
        <template #title>
          <span style="margin-left: 6px">{{ item.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import type {MenuItemRegistered} from "element-plus";
import type {menuItem} from "@/types/menu";
import {useUserStore} from "@/stores/user";
import MyIcon from "@/components/MyIcon.vue";
import {onMounted, ref} from "vue";

const router = useRouter();
const userStore = useUserStore();


const {menuList} = defineProps<{
  menuList: menuItem[];
}>();
const role = userStore.type
const newList = ref([])
onMounted(() => {
  setTimeout(() => {
    menuList.forEach((item) => {
      if (-1 !== item.role.indexOf(role)) {
        let obj = item
        if (item.children.length !== 0) {
          obj.children = item.children.filter(child => child.role.indexOf(role) !== -1)
        }
        newList.value.push(obj);
      }
    })
    console.log(newList.value);
  }, 100)
})


const handleNavigate = (item: MenuItemRegistered) => {
  router.push({
    path: item.index,
  });
};
</script>

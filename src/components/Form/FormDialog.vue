<template>
  <el-dialog
    :close-icon="CloseBold"
    v-model="visible"
    :width="props.width"
    :title="props.title"
    :draggable="props.draggable"
  >
    <slot></slot>
    <template #footer>
      <el-button type="primary" @click="submit" :loading="props.loading">
        确定
      </el-button>
      <el-button type="default" @click="visible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { CloseBold } from "@element-plus/icons-vue";
const props = defineProps({
  title: {
    type: String,
    default: "表单",
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "30%",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const visible = defineModel<boolean>();
const emit = defineEmits(["submit"]);

const submit = () => {
  emit("submit");
};
</script>

<style scoped></style>

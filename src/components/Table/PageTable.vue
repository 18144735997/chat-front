<template>
  <MyTable v-bind="$attrs">
    <template #search v-if="$slots.search">
      <slot name="search"></slot>
    </template>
    <template v-for="(_, key) in $slots" #[key]="{ row }">
      <slot :name="key" :row="row"></slot>
    </template>
  </MyTable>
  <el-pagination
    style="margin-top: 8px"
    v-model:current-page="index"
    v-model:page-size="size"
    :page-sizes="props.pageSizes ?? [1, 2, 5, 10]"
    :background="true"
    layout="->,total,sizes, prev, pager, next"
    :total="total"
    @size-change="getTableData"
    @current-change="getTableData"
  />
</template>

<script setup lang="ts">
import { inject } from "vue";
import MyTable from "./MyTable.vue";

const props = defineProps<{
  pageSizes?: number[];
}>();

// 分页器
const index = defineModel<number>("index");
const size = defineModel<number>("size");
const total = defineModel<number>("total");

const { getTableData } = inject<any>("table");
</script>

<style scoped></style>

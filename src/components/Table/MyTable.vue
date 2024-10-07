<template>
  <ElCard v-if="$slots.search" shadow="never">
    <slot name="search"></slot>
  </ElCard>
  <el-table
    ref="elTableRef"
    style="margin-top: 8px"
    v-bind="$attrs"
    :data="props.tableData ? props.tableData : tableData"
    :border="true"
    row-key="id"
    @selection-change="handleSelectionChange"
    @current-change="handleCurrentChange"
  >
    <el-table-column v-if="$attrs.select" type="selection" width="55" />
    <template
      v-for="column in props.tableColumn ? props.tableColumn : tableColumn"
    >
      <el-table-column v-if="!column.slotType" v-bind="column" />
      <el-table-column v-else v-bind="column">
        <template #default="{ row }">
          <slot :name="column.slotType" :row="row"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults.mjs";

type OptionalProps<T> = Partial<Omit<TableColumnCtx<T>, "prop" | "label">>;
export interface ITableDataColumn<T = any> extends OptionalProps<T> {
  prop: string;
  label: string;
  slotType?: string;
}

interface Props {
  tableData?: Array<any>;
  tableColumn?: Array<ITableDataColumn>;
  noSpace?: boolean;
}

const props = defineProps<Props>();

// 表格数据
const { tableData, tableColumn, getTableData } = inject<any>("table");

const emit = defineEmits<{
  selectionChange: [val: any];
  currentChange: [currentRow: any, oldCurrentRow: any];
}>();

// 表格多选回调
const handleSelectionChange = (val: any) => {
  emit("selectionChange", val);
};

// 表格单选回调
const handleCurrentChange = (currentRow: any, oldCurrentRow: any) => {
  emit("currentChange", currentRow, oldCurrentRow);
};

onMounted(() => {
  getTableData();
});
</script>

<style scoped lang="scss">
.el-button + .el-button {
  margin-left: 12px;
}

.el-card {
  :deep(.el-form) {
    margin-bottom: -20px;
  }
}
</style>

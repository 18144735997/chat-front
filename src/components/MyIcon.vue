<template>
  <i
    class="ynDesign"
    :class="[className]"
    :style="{ fontSize: `${props.size}px` }"
  ></i>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 18,
  },
});
const className = ref(`yn-${props.icon}`);
watchEffect(() => {
  className.value = `yn-${props.icon}`;
});
</script>

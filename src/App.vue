<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<style lang="scss">
@import url("./assets/css/reset.scss");
html,
body,
#app {
  width: 100%;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0;
  }
}

</style>

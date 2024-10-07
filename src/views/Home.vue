<template>
  <div>当前在线人数：{{ onlineNum }}</div>
  <div>历史最大注册量：{{ registerNum }}</div>
</template>

<script setup lang="ts">
import {useWebsocketStore} from "@/stores/websocketStores";
import {onMounted, ref} from "vue";
import CountApi from "@/api/module/login";

const onlineNum = ref()
const ws = useWebsocketStore();

function listen(){
  ws.ws.onmessage = (e) => {
    onlineNum.value = parseInt(e.data)
  }
}

const registerNum = ref()
onMounted(() => {
  ws.connect("ws://localhost:8080/ws")
  getCount()
  listen()
})

async function getCount() {
  const [err, res] = await CountApi.Count()
  if (!err && res) {
    if (res.retCode === "00") {
      registerNum.value = res.count
    }
  }
}
</script>

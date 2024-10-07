<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <p style="text-align: center;font-size: medium">用户列表</p>
        <el-scrollbar>
          <p v-for="user in users" :key="user.id" class="scrollbar-demo-item">{{ user.nick }}</p>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-main>
          <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
            <li v-for="(v,index) in chat" :key="index" class="infinite-list-item">
              <div :style="{'text-align':v.id===user.id?'right':'left'}" style="width: 100%">
                {{ v.nick }}:{{ v.msg }}
              </div>
            </li>
          </ul>
        </el-main>
        <el-footer height="200px">
          <el-input
              v-model="inputVal"
              style="max-width: 100%"
              size="large"
              placeholder="Please input"
          >
            <template #append>
              <el-button type="primary" @click="send">发送</el-button>
            </template>
          </el-input>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Api from "@/api/module/login";
import {onMounted, onUnmounted, ref} from "vue";
import {useChatWebsocketStore} from "@/stores/chatWebsocketStores";
import {useUserStore} from "@/stores/user";
import GetMessage from "@/api/module/message";

const user = useUserStore();
const ws = useChatWebsocketStore()
const inputVal = ref("")
const count = ref(50)
const chat = ref([])
const load = () => {
  count.value += 2
}

async function getChat() {
  const [err, res] = await GetMessage.GetMessage();
  if (!err && res) {
    if (res.retCode === "00") {
      chat.value = res.data
    }
  }
}

function send() {
  let obj = {
    id: user.id,
    msg: inputVal.value,
    nick: user.nick,
  }
  ws.ws.send(JSON.stringify(obj))
  inputVal.value = ""
}

function listen() {
  ws.ws.onmessage = (e) => {
    let obj = JSON.parse(e.data)
    chat.value.push(obj)
  }
}

const users = ref([])
onMounted(() => {
  getChat()
  ws.connect("ws://localhost:8080/chat")
  findAll()
  listen()
})


async function findAll() {
  const [err, res] = await Api.FindAll()
  if (!err && res) {
    console.log(res)
    if (res.retCode === "00") {
      users.value = res.users
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.common-layout, .el-container {
  height: 100%;
}

.infinite-list {
  height: 610px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  //justify-content: left;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 5px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>

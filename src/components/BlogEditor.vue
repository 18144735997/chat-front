<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChanged"
    />
  </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { ref, shallowRef } from "vue";
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from "@wangeditor/editor";
import { uploadOSS } from "@/utils/oss";
const emit = defineEmits<{
  editorHtmlChange: [length: number, html: string];
}>();
type InsertFnType = (url: string, alt?: string, href?: string) => void;
const editorRef = shallowRef<IDomEditor>();
const valueHtml = defineModel<string>();
const mode = "default";
const toolbarConfig = ref<IToolbarConfig | {}>({});
const editorConfig = ref<IEditorConfig | {}>({
  MENU_CONF: {
    uploadImage: {
      async customUpload(file: File, insertFn: InsertFnType) {
        const appendfix = file.name.split(".")[1];
        const filename = `${new Date().getTime()}.${appendfix}`;
        const url = await uploadOSS(file, filename);
        insertFn(url, filename);
      },
    },
  },
});
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor;
};
const handleChanged = ({ getText, getHtml }: IDomEditor) => {
  emit("editorHtmlChange", getText().length, getHtml());
};
</script>

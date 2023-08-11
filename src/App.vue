<script setup lang="ts">
  import { ref } from "vue";

  import HtmlViewer from "./components/HtmlViewer.vue";
  import MarkdownEditor from "./components/MarkdownEditor.vue";
  import TiptapEditor from "./components/TiptapEditor.vue";

  const html = ref("<p>I'm running Tiptap with Vue.js. 🎉</p>");
</script>
<template>
  <div class="grid h-screen max-h-screen grid-cols-3 gap-4 p-8">
    <TiptapEditor v-model="html" />
    <MarkdownEditor v-model="html" />
    <HtmlViewer :html="html" />
  </div>
</template>

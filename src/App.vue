<script setup lang="ts">
  import { ref } from "vue";

  import HtmlViewer from "./components/HtmlViewer.vue";
  import MarkdownEditor from "./components/MarkdownEditor.vue";
  import TiptapEditor from "./components/TiptapEditor.vue";

  const html = ref(
    "<p>I'm running Tiptap with Vue.js. 🎉</p> <h2>Heading 2</h2> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis est quaerat eum repudiandae id accusantium perferendis excepturi. Ea eaque similique aliquam illum corporis rem minima.</p>"
  );
</script>
<template>
  <div class="grid h-screen max-h-screen grid-cols-3 gap-4 p-8">
    <TiptapEditor v-model="html" />
    <MarkdownEditor v-model="html" />
    <HtmlViewer :html="html" />
  </div>
</template>

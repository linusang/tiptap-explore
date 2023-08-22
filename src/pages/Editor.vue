<script setup lang="ts">
  import { onMounted, ref } from "vue";

  // import htmlText from "@/assets/sample-html.txt";
  import HtmlViewer from "@/components/HtmlViewer.vue";
  import MarkdownEditor from "@/components/MarkdownEditor.vue";
  import TiptapEditor from "@/components/TiptapEditor.vue";

  const html = ref("");

  onMounted(() => {
    const url =
      import.meta.env.BASE_URL === "/"
        ? "/sample-html.txt"
        : `${import.meta.env.BASE_URL}/sample-html.txt`;

    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        html.value = text;
      });
  });
</script>
<template>
  <div class="grid h-screen max-h-screen grid-cols-3 gap-4 p-8">
    <TiptapEditor v-model="html" />
    <MarkdownEditor v-model="html" />
    <HtmlViewer :html="html" />
  </div>
</template>

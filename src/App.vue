<script setup lang="ts">
  import rehtypeFormat from "rehype-format";
  import rehypeParse from "rehype-parse";
  import rehypeStringify from "rehype-stringify";
  import { unified } from "unified";
  import { computed, ref } from "vue";

  import MarkdownEditor from "./components/MarkdownEditor.vue";
  import TiptapEditor from "./components/TiptapEditor.vue";

  const html = ref("<p>I'm running Tiptap with Vue.js. 🎉</p>");

  const formattedHtml = computed(() => {
    const processor = unified()
      .use(rehypeParse, { fragment: true })
      .use(rehtypeFormat)
      .use(rehypeStringify, { quoteSmart: true });

    return processor.processSync(html.value).toString();
  });
</script>
<template>
  <div class="grid grid-cols-3">
    <TiptapEditor v-model="html" />
    <MarkdownEditor v-model="html" />
    <section>
      <div>HTML</div>
      <div class="content">
        <pre><code>{{ formattedHtml }}</code></pre>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  /* Basic editor styles */
  .ProseMirror {
    > * + * {
      margin-top: 0.75em;
    }

    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }
  }

  .content {
    pre {
      border-radius: 5px;
      color: #333;
    }

    code {
      display: block;
      white-space: pre-wrap;
      font-size: 0.8rem;
      padding: 0.75rem 1rem;
      background-color: #e9ecef;
      color: #495057;
    }
  }
</style>

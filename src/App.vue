<template>
  <div>
    <Tiptap v-model="html" />
    <div class="content">
      <h3>HTML</h3>
      <pre><code>{{ html }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  import Tiptap from "./components/Tiptap.vue";

  const html = ref("<p>I'm running Tiptap with Vue.js. 🎉</p>");
</script>

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
    padding: 1rem 0 0;

    h3 {
      margin: 1rem 0 0.5rem;
    }

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

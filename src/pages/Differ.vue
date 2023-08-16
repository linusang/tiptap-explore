<script setup lang="ts">
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-nocheck
  import "diff2html/bundles/css/diff2html.min.css";

  import { createTwoFilesPatch } from "diff";
  import { html } from "diff2html";
  import { ref } from "vue";

  const left = ref("Hello World");
  const right = ref("Hello There");
  const outputHtml = ref("");

  function performDiff() {
    const diff = createTwoFilesPatch("left", "right", left.value, right.value);

    outputHtml.value = html(diff, {
      inputFormat: "diff",
      showFiles: true,
      matching: "lines",
      outputFormat: "side-by-side",
    });
  }
</script>

<template>
  <div class="grid gap-8 p-8">
    <h1 class="text-2xl font-bold">Diff Viewer</h1>
    <div class="grid h-[50vh] grid-cols-2 gap-4">
      <div>
        <textarea
          v-model="left"
          class="h-full w-full resize-none border border-gray-300 p-2 font-mono text-xs focus:border-gray-600"
        ></textarea>
      </div>
      <div>
        <textarea
          v-model="right"
          class="h-full w-full resize-none border border-gray-300 p-2 font-mono text-xs focus:border-gray-600"
        ></textarea>
      </div>
    </div>

    <div>
      <button
        class="w-full rounded bg-gray-300 py-2 text-gray-700 transition-colors hover:bg-gray-200"
        @click="performDiff"
      >
        Perform Diff
      </button>
    </div>

    <div v-html="outputHtml"></div>
  </div>
</template>

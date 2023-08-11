<script setup lang="ts">
  import rehtypeFormat from "rehype-format";
  import rehypeParse from "rehype-parse";
  import rehypeStringify from "rehype-stringify";
  import { unified } from "unified";
  import { computed } from "vue";

  const props = defineProps<{
    html: string;
  }>();

  const formattedHtml = computed(() => {
    const processor = unified()
      .use(rehypeParse, { fragment: true })
      .use(rehtypeFormat)
      .use(rehypeStringify, { quoteSmart: true });

    return processor.processSync(props.html).toString();
  });
</script>

<template>
  <section class="grid grid-rows-[min-content_1fr] overflow-auto">
    <div class="h-[4rem]">
      <div>HTML</div>
    </div>

    <pre
      class="overflow-auto rounded bg-slate-200"
    ><code class=" text-slate-600 block whitespace-pre-wrap px-4 py-2 text-sm h-full">{{ formattedHtml }}</code></pre>
  </section>
</template>

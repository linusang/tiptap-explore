<script setup lang="ts">
  import { useVModel } from "@vueuse/core";
  import rehypeParse from "rehype-parse";
  import rehypeRemark from "rehype-remark";
  import rehypeStringify from "rehype-stringify";
  import remarkGfm from "remark-gfm";
  import remarkParse from "remark-parse";
  import remarkRehype from "remark-rehype";
  import remarkStringify from "remark-stringify";
  import { unified } from "unified";
  import { ref, watch } from "vue";

  const props = withDefaults(
    defineProps<{
      modelValue?: string;
    }>(),
    {
      modelValue: "",
    }
  );
  const emit = defineEmits(["update:modelValue"]);

  useVModel(props, "modelValue", emit);
  const markdown = ref<string>("");

  function htmlToMarkdown(html: string) {
    const processor = unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeRemark)
      .use(remarkGfm)
      .use(remarkStringify, {
        bullet: "-",
        listItemIndent: "one",
      });

    return processor.processSync(html).toString();
  }

  function markdownToHtml(markdown: string) {
    const processor = unified()
      .use(remarkParse) // Parse markdown content to a syntax tree
      .use(remarkGfm) // Turn markdown syntax tree to a GitHub Flavored Markdown syntax tree
      .use(remarkRehype) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
      .use(rehypeStringify); // Serialize HTML syntax tree

    return processor.processSync(markdown).toString();
  }

  watch(
    () => props.modelValue,
    (newHtml) => {
      const converted = htmlToMarkdown(newHtml);
      const isSame = markdown.value === converted;

      if (isSame) {
        return;
      }

      markdown.value = converted;
    },
    {
      immediate: true,
    }
  );

  //   watch(markdown, (newMarkdown) => {
  //     // const isSame = props.modelValue === markdownToHtml(newMarkdown);

  //     // if (isSame) {
  //     //   return;
  //     // }

  //     emit("update:modelValue", markdownToHtml(newMarkdown));
  //   });

  function convert() {
    // console.log(markdownToHtml(markdown.value));

    const html = markdownToHtml(markdown.value);
    emit("update:modelValue", html);
  }
</script>

<template>
  <div class="grid grid-rows-[auto_1fr] gap-4">
    <div>
      <div>Markdown</div>
      <button
        class="rounded border border-black px-4 py-1 text-xs text-black"
        @click="convert"
      >
        Convert
      </button>
    </div>
    <textarea
      v-model="markdown"
      class="h-full w-full resize-none border border-gray-400 p-1 font-mono text-xs focus:border-gray-900 focus:outline-none"
    ></textarea>
  </div>
</template>

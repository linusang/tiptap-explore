<script setup lang="ts">
  import Bold from "@tiptap/extension-bold";
  import BulletList from "@tiptap/extension-bullet-list";
  import Document from "@tiptap/extension-document";
  import Gapcursor from "@tiptap/extension-gapcursor";
  import Heading from "@tiptap/extension-heading";
  import History from "@tiptap/extension-history";
  import Italic from "@tiptap/extension-italic";
  import { Link } from "@tiptap/extension-link";
  import ListItem from "@tiptap/extension-list-item";
  import OrderedList from "@tiptap/extension-ordered-list";
  import Paragraph from "@tiptap/extension-paragraph";
  import Strike from "@tiptap/extension-strike";
  import Table from "@tiptap/extension-table";
  import TableCell from "@tiptap/extension-table-cell";
  import TableHeader from "@tiptap/extension-table-header";
  import TableRow from "@tiptap/extension-table-row";
  import Text from "@tiptap/extension-text";
  import { Underline } from "@tiptap/extension-underline";
  import StarterKit from "@tiptap/starter-kit";
  import { EditorContent, useEditor } from "@tiptap/vue-3";
  import { useVModel } from "@vueuse/core";
  import { onBeforeUnmount, watch } from "vue";

  import EditorMenu from "./EditorMenu.vue";

  const props = withDefaults(
    defineProps<{
      modelValue?: string;
    }>(),
    {
      modelValue: "",
    }
  );
  const emit = defineEmits(["update:modelValue"]);

  const data = useVModel(props, "modelValue", emit);

  const editor = useEditor({
    extensions: [
      // StarterKit,
      Underline,
      Link.configure({
        protocols: ["mailto"],
        openOnClick: false,
      }),
      // Table.configure({
      //   resizable: true,
      //   allowTableNodeSelection: true,
      // }),
      // TableRow,
      // TableHeader,
      // TableCell,
      Document,
      Paragraph,
      Text,
      Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      BulletList,
      ListItem,
      OrderedList,
      History,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Bold,
      Italic,
      Strike,
    ],
    content: data.value,
    onUpdate: () => {
      emit("update:modelValue", editor.value?.getHTML() ?? "");
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none border border-gray-400 p-1 focus:border-gray-900 h-full overflow-auto max-w-none tiptap",
      },
    },
  });

  onBeforeUnmount(() => {
    editor.value?.destroy();
  });

  watch(
    () => props.modelValue,
    (value) => {
      const isSame = value === editor.value?.getHTML();

      if (isSame) {
        return;
      }

      editor.value?.commands.setContent(value, false);
    }
  );
</script>

<template>
  <div class="grid grid-rows-[auto_1fr] gap-4 overflow-auto">
    <div>
      <div>WISIWYG</div>
      <EditorMenu v-if="editor" :editor="editor" />
    </div>

    <EditorContent :editor="editor" class="h-full overflow-auto" />
  </div>
</template>

<style lang="scss">
  .tiptap {
    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      td,
      th {
        min-width: 1em;
        border: 2px solid #ced4da;
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
        background-color: #f1f3f5;
      }

      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: -2px;
        width: 4px;
        background-color: #adf;
        pointer-events: none;
      }

      p {
        margin: 0;
      }
    }
  }

  .tableWrapper {
    padding: 1rem 0;
    overflow-x: auto;
  }

  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }

  h1 {
    @apply text-4xl font-bold;
  }

  h2 {
    @apply text-3xl font-bold;
  }

  h3 {
    @apply text-2xl font-bold;
  }

  h4 {
    @apply text-xl font-bold;
  }

  h5 {
    @apply text-lg font-bold;
  }

  h6 {
    @apply text-base font-bold;
  }

  p {
    @apply my-4;
  }

  ul {
    @apply list-disc;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  li p {
    @apply my-0;
  }
</style>

<script setup lang="ts">
  import { Link } from "@tiptap/extension-link";
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
      StarterKit,
      Underline,
      Link.configure({
        protocols: ["mailto"],
        openOnClick: false,
      }),
    ],
    content: data.value,
    onUpdate: () => {
      emit("update:modelValue", editor.value?.getHTML() ?? "");
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none prose border border-gray-400 p-1 focus:border-gray-900 h-full overflow-auto max-w-none",
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

<script setup lang="ts">
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
    extensions: [StarterKit, Underline],
    content: data.value,
    onUpdate: () => {
      emit("update:modelValue", editor.value?.getHTML() ?? "");
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none prose border border-gray-400 p-1 focus:border-gray-900",
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
  <div>
    <EditorMenu :editor="editor" />
    <div class="">
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

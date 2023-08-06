<script setup lang="ts">
  import StarterKit from "@tiptap/starter-kit";
  import { EditorContent, useEditor } from "@tiptap/vue-3";
  import { useVModel } from "@vueuse/core";
  import { onBeforeUnmount, watch } from "vue";

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
    extensions: [StarterKit],
    content: data.value,
    onUpdate: () => {
      emit("update:modelValue", editor.value?.getHTML() ?? "");
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
  <editor-content :editor="editor" />
</template>

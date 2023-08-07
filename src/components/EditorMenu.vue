<script setup lang="ts">
  import { Editor } from "@tiptap/vue-3";

  const props = defineProps<{
    editor?: Editor;
  }>();

  const commandButtons = [
    {
      name: "Bold",
      icon: "bold",
      command: () => props.editor?.chain().focus().toggleBold().run(),
      isActive: () => props.editor?.isActive("bold"),
    },
    {
      name: "Italic",
      icon: "italic",
      command: () => props.editor?.chain().focus().toggleItalic().run(),
      isActive: () => props.editor?.isActive("italic"),
    },
  ];
</script>

<template>
  <div class="flex gap-2">
    <template v-for="commandButton in commandButtons" :key="commandButton.name"
      ><button
        class="rounded-lg border border-gray-400 px-2 py-1"
        :class="{ 'bg-gray-500 text-gray-100': commandButton.isActive() }"
        @click="commandButton.command"
      >
        {{ commandButton.name }}
      </button></template
    >
  </div>
</template>

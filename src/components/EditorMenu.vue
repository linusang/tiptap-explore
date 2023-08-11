<script setup lang="ts">
  import { Editor } from "@tiptap/vue-3";

  import RiBold from "~icons/ri/bold";
  import RiIndentDecrease from "~icons/ri/indent-decrease";
  import RiIndentIncrease from "~icons/ri/indent-increase";
  import RiItalic from "~icons/ri/italic";
  import RiListOrdered from "~icons/ri/list-ordered";
  import RiListUnordered from "~icons/ri/list-unordered";
  import RiStrikethrough from "~icons/ri/strikethrough";
  import RiUnderline from "~icons/ri/underline";

  const props = defineProps<{
    editor: Editor;
  }>();

  const basicCommands = [
    {
      name: "bold",
      icon: RiBold,
      command: () => props.editor.chain().focus().toggleBold().run(),
      isActive: () => props.editor.isActive("bold"),
      disabled: () => !props.editor.can().toggleBold(),
    },
    {
      name: "italic",
      icon: RiItalic,
      command: () => props.editor.chain().focus().toggleItalic().run(),
      isActive: () => props.editor.isActive("italic"),
      disabled: () => !props.editor.can().toggleItalic(),
    },
    {
      name: "underline",
      icon: RiUnderline,
      command: () => props.editor.chain().focus().toggleUnderline().run(),
      isActive: () => props.editor.isActive("underline"),
      disabled: () => !props.editor.can().toggleUnderline(),
    },
    {
      name: "strike",
      icon: RiStrikethrough,
      command: () => props.editor.chain().focus().toggleStrike().run(),
      isActive: () => props.editor.isActive("strike"),
      disabled: () => !props.editor.can().toggleStrike(),
    },
  ];

  const listCommands = [
    {
      name: "bulletList",
      icon: RiListUnordered,
      command: () => props.editor.chain().focus().toggleBulletList().run(),
      isActive: () => props.editor.isActive("bulletList"),
      disabled: () => !props.editor.can().toggleBulletList(),
    },
    {
      name: "orderedList",
      icon: RiListOrdered,
      command: () => props.editor.chain().focus().toggleOrderedList().run(),
      isActive: () => props.editor.isActive("orderedList"),
      disabled: () => !props.editor.can().toggleOrderedList(),
    },
    {
      name: "increase_indent",
      icon: RiIndentIncrease,
      command: () =>
        props.editor.chain().focus().sinkListItem("listItem").run(),
      disabled: () => !props.editor.can().sinkListItem("listItem"),
    },
    {
      name: "decrease_indent",
      icon: RiIndentDecrease,
      command: () =>
        props.editor.chain().focus().liftListItem("listItem").run(),
      disabled: () => !props.editor.can().liftListItem("listItem"),
    },
  ];
</script>

<template>
  <div class="flex gap-2">
    <section class="flex">
      <template v-for="commandButton in basicCommands" :key="commandButton.name"
        ><button
          class="rounded border border-gray-400 p-1 disabled:bg-slate-200 disabled:text-slate-300"
          :class="{ 'bg-emerald-500 text-gray-100': commandButton.isActive() }"
          :disabled="commandButton.disabled && commandButton.disabled()"
          @click="commandButton.command"
        >
          <component :is="commandButton.icon" class="h-5 w-5" /></button
      ></template>
    </section>
    <section class="flex">
      <template v-for="commandButton in listCommands" :key="commandButton.name"
        ><button
          class="rounded border border-gray-400 p-1 disabled:bg-slate-200 disabled:text-slate-300"
          :class="{
            'bg-emerald-300 text-emerald-800':
              commandButton.isActive && commandButton.isActive(),
          }"
          :disabled="commandButton.disabled && commandButton.disabled()"
          @click="commandButton.command"
        >
          <component :is="commandButton.icon" class="h-5 w-5" /></button
      ></template>
    </section>
  </div>
</template>

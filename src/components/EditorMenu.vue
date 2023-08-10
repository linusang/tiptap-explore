<script setup lang="ts">
  import { Editor } from "@tiptap/vue-3";

  import FaSolidBold from "~icons/fa-solid/bold";
  import FaSolidIndent from "~icons/fa-solid/indent";
  import FaSolidItalic from "~icons/fa-solid/italic";
  import FaSolidListOl from "~icons/fa-solid/list-ol";
  import FaSolidListUl from "~icons/fa-solid/list-ul";
  import FaSolidOutdent from "~icons/fa-solid/outdent";
  import FaSolidStrikethrough from "~icons/fa-solid/strikethrough";
  import FaSolidUnderline from "~icons/fa-solid/underline";

  const props = defineProps<{
    editor?: Editor;
  }>();

  const basicCommands = [
    {
      name: "bold",
      icon: FaSolidBold,
      command: () => props.editor?.chain().focus().toggleBold().run(),
      isActive: () => props.editor?.isActive("bold"),
    },
    {
      name: "italic",
      icon: FaSolidItalic,
      command: () => props.editor?.chain().focus().toggleItalic().run(),
      isActive: () => props.editor?.isActive("italic"),
    },
    {
      name: "underline",
      icon: FaSolidUnderline,
      command: () => props.editor?.chain().focus().toggleUnderline().run(),
      isActive: () => props.editor?.isActive("underline"),
    },
    {
      name: "strike",
      icon: FaSolidStrikethrough,
      command: () => props.editor?.chain().focus().toggleStrike().run(),
      isActive: () => props.editor?.isActive("strike"),
    },
  ];

  const listCommands = [
    {
      name: "bulletList",
      icon: FaSolidListUl,
      command: () => props.editor?.chain().focus().toggleBulletList().run(),
      isActive: () => props.editor?.isActive("bulletList"),
    },
    {
      name: "orderedList",
      icon: FaSolidListOl,
      command: () => props.editor?.chain().focus().toggleOrderedList().run(),
      isActive: () => props.editor?.isActive("orderedList"),
    },
    {
      name: "increase_indent",
      icon: FaSolidIndent,
      command: () =>
        props.editor?.chain().focus().sinkListItem("listItem").run(),
      disabled: !props.editor?.can().sinkListItem("listItem"),
    },
    {
      name: "decrease_indent",
      icon: FaSolidOutdent,
      command: () =>
        props.editor?.chain().focus().liftListItem("listItem").run(),
      disabled: !props.editor?.can().liftListItem("listItem"),
    },
  ];
</script>

<template>
  <div class="flex gap-2">
    <section class="flex">
      <template v-for="commandButton in basicCommands" :key="commandButton.name"
        ><button
          class="rounded border border-gray-400 px-2 py-1"
          :class="{ 'bg-emerald-500 text-gray-100': commandButton.isActive() }"
          @click="commandButton.command"
        >
          <component :is="commandButton.icon" class="h-4 w-4" /></button
      ></template>
    </section>
    <section class="flex">
      <template v-for="commandButton in listCommands" :key="commandButton.name"
        ><button
          class="rounded border border-gray-400 px-2 py-1"
          :class="{
            'bg-emerald-500 text-gray-100':
              commandButton.isActive && commandButton.isActive(),
          }"
          :disabled="commandButton.disabled"
          @click="commandButton.command"
        >
          <component :is="commandButton.icon" class="h-4 w-4" /></button
      ></template>
    </section>
  </div>
</template>

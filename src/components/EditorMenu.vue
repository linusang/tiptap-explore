<script setup lang="ts">
  import { Editor } from "@tiptap/vue-3";
  import { ref } from "vue";

  import { useBasicCommands } from "@/composables/basicCommands";
  import { useHeadingCommands } from "@/composables/headingCommands";
  import { useHistoryCommands } from "@/composables/historyCommands";
  import { useLinkCommands } from "@/composables/linkCommands";
  import { useListCommands } from "@/composables/listCommands";
  import { useTableCommands } from "@/composables/tableCommands";

  import EditorMenuButton from "./EditorMenuButton.vue";

  const props = defineProps<{
    editor: Editor;
  }>();

  const { basicCommands } = useBasicCommands(props.editor);

  const { listCommands } = useListCommands(props.editor);

  const dialog = ref<HTMLDialogElement | null>(null);
  const { linkCommands, linkUrl, setLink } = useLinkCommands(
    props.editor,
    dialog
  );

  const { historyCommands } = useHistoryCommands(props.editor);

  const { headingCommands } = useHeadingCommands(props.editor);

  const { tableCommands } = useTableCommands(props.editor);
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <section class="flex">
      <template v-for="commandButton in basicCommands" :key="commandButton.name"
        ><EditorMenuButton
          :is-active="commandButton.isActive && commandButton.isActive()"
          :is-disabled="commandButton.disabled && commandButton.disabled()"
          :tooltip="commandButton.tooltip"
          @click="commandButton.command"
        >
          <component :is="commandButton.icon" class="h-5 w-5" />
        </EditorMenuButton>
      </template>
    </section>
    <section class="flex">
      <template v-for="commandButton in listCommands" :key="commandButton.name">
        <EditorMenuButton
          :is-active="commandButton.isActive && commandButton.isActive()"
          :is-disabled="commandButton.disabled && commandButton.disabled()"
          :tooltip="commandButton.tooltip"
          @click="commandButton.command"
        >
          <component :is="commandButton.icon" class="h-5 w-5" />
        </EditorMenuButton>
      </template>
    </section>

    <section class="flex">
      <template v-for="commandButton in linkCommands" :key="commandButton.name">
        <EditorMenuButton
          :is-active="commandButton.isActive && commandButton.isActive()"
          :is-disabled="commandButton.disabled && commandButton.disabled()"
          :tooltip="commandButton.tooltip"
          @click="commandButton.command"
        >
          <component :is="commandButton.icon" class="h-5 w-5" />
        </EditorMenuButton>
      </template>
    </section>

    <section class="flex">
      <template
        v-for="commandButton in historyCommands"
        :key="commandButton.name"
      >
        <EditorMenuButton
          :tooltip="commandButton.tooltip"
          :is-disabled="commandButton.disabled && commandButton.disabled()"
          @click="commandButton.command"
        >
          <component :is="commandButton.icon" class="h-5 w-5" />
        </EditorMenuButton>
      </template>
    </section>

    <section class="flex">
      <template
        v-for="commandButton in headingCommands"
        :key="commandButton.name"
      >
        <EditorMenuButton
          :is-disabled="commandButton.disabled && commandButton.disabled()"
          :is-active="commandButton.isActive && commandButton.isActive()"
          :tooltip="commandButton.tooltip"
          @click="commandButton.command"
        >
          <component :is="commandButton.icon" class="h-5 w-5" />
        </EditorMenuButton>
      </template>
    </section>

    <section>
      <template
        v-for="commandButton in tableCommands"
        :key="commandButton.name"
      >
        <EditorMenuButton
          :is-active="commandButton.isActive && commandButton.isActive()"
          :is-disabled="commandButton.disabled && commandButton.disabled()"
          :tooltip="commandButton.tooltip"
          @click="commandButton.command"
        >
          <component
            :is="commandButton.icon"
            class="h-5 w-5"
            :class="[commandButton.iconCss]"
          />
        </EditorMenuButton>
      </template>
    </section>

    <!-- <BubbleMenu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100, arrow: true, animation: 'fade' }"
      class="rounded border border-gray-300 bg-gray-100 p-2 shadow-lg"
    >
      <template v-for="commandButton in basicCommands" :key="commandButton.name"
        ><EditorMenuButton
          :is-active="commandButton.isActive()"
          :is-disabled="commandButton.disabled && commandButton.disabled()"
          @click="commandButton.command"
        >
          <component :is="commandButton.icon" class="h-5 w-5" />
        </EditorMenuButton>
      </template>
    </BubbleMenu> -->
  </div>
  <dialog ref="dialog">
    <div class="grid w-96 gap-4">
      <div>Provide the URL for the link</div>
      <div>
        <input
          v-model="linkUrl"
          type="text"
          class="w-full rounded border border-gray-400 px-2 py-1"
          @keyup.enter="setLink"
          @key.escape="dialog?.close()"
        />
      </div>
      <div class="flex justify-end gap-4">
        <button
          class="rounded border border-gray-400 bg-gray-200 px-4"
          @click="dialog?.close()"
        >
          Cancel
        </button>
        <button
          class="rounded border border-gray-400 bg-gray-200 px-4"
          @click="setLink"
        >
          Set
        </button>
      </div>
    </div>
  </dialog>
</template>

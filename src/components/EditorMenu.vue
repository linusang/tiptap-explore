<script setup lang="ts">
  import { Editor } from "@tiptap/vue-3";
  import { ref } from "vue";

  import { useBasicCommands } from "@/composables/basicCommands";
  import { useLinkCommands } from "@/composables/linkCommands";
  import { useListCommands } from "@/composables/listCommands";

  // go to https://icones.js.org/collection/ri for more icons
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
</script>

<template>
  <div class="flex gap-2">
    <section class="flex">
      <template v-for="commandButton in basicCommands" :key="commandButton.name"
        ><EditorMenuButton
          :is-active="commandButton.isActive()"
          :is-disabled="commandButton.disabled && commandButton.disabled()"
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
          @click="commandButton.command"
        >
          <component :is="commandButton.icon" class="h-5 w-5" />
        </EditorMenuButton>
      </template>
    </section>
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

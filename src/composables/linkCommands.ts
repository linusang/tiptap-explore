import { Editor } from "@tiptap/vue-3";
import { Ref, ref } from "vue";

import RiLinkM from "~icons/ri/link-m";
import RiLinkUnlinkM from "~icons/ri/link-unlink-m";

export function useLinkCommands(
  editor: Editor,
  dialog: Ref<HTMLDialogElement | null>
) {
  const linkUrl = ref("");
  const linkCommands = [
    {
      name: "link",
      icon: RiLinkM,
      command: () => {
        openLinkDialog();
      },
      isActive: () => editor.isActive("link"),
      disabled: () =>
        !editor.isActive("link") && editor.view.state.selection.empty,
    },
    {
      name: "unlink",
      icon: RiLinkUnlinkM,
      command: () => editor.chain().focus().unsetLink().run(),
      disabled: () => !editor.isActive("link"),
    },
  ];

  function openLinkDialog() {
    linkUrl.value = editor.getAttributes("link").href;
    dialog.value?.showModal();
  }

  function setLink() {
    if (linkUrl.value === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      dialog.value?.close();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl.value })
      .run();
    dialog.value?.close();
  }

  return {
    linkUrl,
    linkCommands,
    openLinkDialog,
    setLink,
  };
}

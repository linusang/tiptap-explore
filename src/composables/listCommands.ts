import { Editor } from "@tiptap/vue-3";

import RiIndentDecrease from "~icons/ri/indent-decrease";
import RiIndentIncrease from "~icons/ri/indent-increase";
import RiListOrdered from "~icons/ri/list-ordered";
import RiListUnordered from "~icons/ri/list-unordered";

export function useListCommands(editor: Editor) {
  const listCommands = [
    {
      name: "bulletList",
      icon: RiListUnordered,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
      disabled: () => !editor.can().toggleBulletList(),
      tooltip: "Bullet list",
    },
    {
      name: "orderedList",
      icon: RiListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
      disabled: () => !editor.can().toggleOrderedList(),
      tooltip: "Ordered list",
    },
    {
      name: "increaseIndent",
      icon: RiIndentIncrease,
      command: () => editor.chain().focus().sinkListItem("listItem").run(),
      disabled: () => !editor.can().sinkListItem("listItem"),
      tooltip: "Increase indent",
    },
    {
      name: "decreaseIndent",
      icon: RiIndentDecrease,
      command: () => editor.chain().focus().liftListItem("listItem").run(),
      disabled: () => !editor.can().liftListItem("listItem"),
      tooltip: "Decrease indent",
    },
  ];

  return { listCommands };
}

import { Editor } from "@tiptap/vue-3";

import FluentArrowRedo16Filled from "~icons/fluent/arrow-redo-16-filled";
import FluentArrowUndo16Filled from "~icons/fluent/arrow-undo-16-filled";

export function useHistoryCommands(editor: Editor) {
  const historyCommands = [
    {
      name: "undo",
      icon: FluentArrowUndo16Filled,
      command: () => editor.chain().focus().undo().run(),
      disabled: () => !editor.can().undo(),
      tooltip: "Undo",
    },
    {
      name: "redo",
      icon: FluentArrowRedo16Filled,
      command: () => editor.chain().focus().redo().run(),
      disabled: () => !editor.can().redo(),
      tooltip: "Redo",
    },
  ];

  return {
    historyCommands,
  };
}

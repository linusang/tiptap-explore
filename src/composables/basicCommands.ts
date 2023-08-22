import { Editor } from "@tiptap/vue-3";

import RiBold from "~icons/ri/bold";
import RiFormatClear from "~icons/ri/format-clear";
import RiItalic from "~icons/ri/italic";
import RiStrikethrough from "~icons/ri/strikethrough";
import RiUnderline from "~icons/ri/underline";

export function useBasicCommands(editor: Editor) {
  const basicCommands = [
    {
      name: "bold",
      icon: RiBold,
      command: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
      disabled: () =>
        editor.view.state.selection.empty || !editor.can().toggleBold(),
      tooltip: "Bold",
    },
    {
      name: "italic",
      icon: RiItalic,
      command: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
      disabled: () =>
        editor.view.state.selection.empty || !editor.can().toggleItalic(),
      tooltip: "Italic",
    },
    {
      name: "underline",
      icon: RiUnderline,
      command: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive("underline"),
      disabled: () =>
        editor.view.state.selection.empty || !editor.can().toggleUnderline(),
      tooltip: "Underline",
    },
    {
      name: "strike",
      icon: RiStrikethrough,
      command: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
      disabled: () =>
        editor.view.state.selection.empty || !editor.can().toggleStrike(),
      tooltip: "Strikethrough",
    },
    {
      name: "clear",
      icon: RiFormatClear,
      command: () => editor.chain().focus().unsetAllMarks().run(),
      disabled: () =>
        editor.view.state.selection.empty || !editor.can().unsetAllMarks(),
      tooltip: "Clear formatting",
    },
  ];

  return { basicCommands };
}

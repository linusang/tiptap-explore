import { Editor } from "@tiptap/vue-3";

import RiH1 from "~icons/ri/h-1";
import RiH2 from "~icons/ri/h-2";
import RiH3 from "~icons/ri/h-3";
import RiH4 from "~icons/ri/h-4";
import RiParagraph from "~icons/ri/paragraph";

export function useHeadingCommands(editor: Editor) {
  const headingCommands = [
    {
      name: "heading1",
      icon: RiH1,
      command: () => editor.chain().focus().setHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
      disabled: () => !editor.can().setHeading({ level: 1 }),
      tooltip: "Heading 1",
    },
    {
      name: "heading2",
      icon: RiH2,
      command: () => editor.chain().focus().setHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
      disabled: () => !editor.can().setHeading({ level: 2 }),
      tooltip: "Heading 2",
    },
    {
      name: "heading3",
      icon: RiH3,
      command: () => editor.chain().focus().setHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
      disabled: () => !editor.can().setHeading({ level: 3 }),
      tooltip: "Heading 3",
    },
    {
      name: "heading4",
      icon: RiH4,
      command: () => editor.chain().focus().setHeading({ level: 4 }).run(),
      isActive: () => editor.isActive("heading", { level: 4 }),
      disabled: () => !editor.can().setHeading({ level: 4 }),
      tooltip: "Heading 4",
    },
    {
      name: "paragraph",
      icon: RiParagraph,
      command: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
      disabled: () => !editor.can().setParagraph(),
      tooltip: "Paragraph",
    },
  ];

  return { headingCommands };
}

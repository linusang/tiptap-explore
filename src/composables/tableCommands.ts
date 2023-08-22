import { Editor } from "@tiptap/vue-3";

import FluentColumnArrowRight20Regular from "~icons/fluent/column-arrow-right-20-regular";
import FluentTableAdd20Regular from "~icons/fluent/table-add-20-regular";
import FluentTableCellsMerge20Regular from "~icons/fluent/table-cells-merge-20-regular";
// import FluentTableCellsSplit20Regular from "~icons/fluent/table-cells-split-20-regular";
import FluentTableDeleteColumn20Regular from "~icons/fluent/table-delete-column-20-regular";
import FluentTableDeleteRow20Regular from "~icons/fluent/table-delete-row-20-regular";
import FluentTableDismiss20Regular from "~icons/fluent/table-dismiss-20-regular";

export function useTableCommands(editor: Editor) {
  const tableCommands = [
    {
      name: "insertTable",
      icon: FluentTableAdd20Regular,
      command: () =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
      tooltip: "Insert table",
    },
    {
      name: "deleteTable",
      icon: FluentTableDismiss20Regular,
      command: () => editor.chain().focus().deleteTable().run(),
      disabled: () => !editor.isActive("table"),
      tooltilp: "Delete table",
    },
    {
      name: "addColumnBefore",
      icon: FluentColumnArrowRight20Regular,
      command: () => editor.chain().focus().addColumnBefore().run(),
      disabled: () => !editor.isActive("table"),
      tooltip: "Add column before",
    },
    {
      name: "addColumnAfter",
      icon: FluentColumnArrowRight20Regular,
      command: () => editor.chain().focus().addColumnAfter().run(),
      iconCss: "transform rotate-180",
      disabled: () => !editor.isActive("table"),
      tooltip: "Add column after",
    },

    {
      name: "addRowBefore",
      icon: FluentColumnArrowRight20Regular,
      command: () => editor.chain().focus().addRowBefore().run(),
      iconCss: "transform rotate-90",
      disabled: () => !editor.isActive("table"),
      tooltip: "Add row before",
    },
    {
      name: "addRowAfter",
      icon: FluentColumnArrowRight20Regular,
      command: () => editor.chain().focus().addRowAfter().run(),
      iconCss: "transform -rotate-90",
      disabled: () => !editor.isActive("table"),
      tooltip: "Add row after",
    },
    {
      name: "deleteColumn",
      icon: FluentTableDeleteColumn20Regular,
      command: () => editor.chain().focus().deleteColumn().run(),
      disabled: () => !editor.isActive("table"),
      tooltip: "Delete column",
    },
    {
      name: "deleteRow",
      icon: FluentTableDeleteRow20Regular,
      command: () => editor.chain().focus().deleteRow().run(),
      disabled: () => !editor.isActive("table"),
      tooltip: "Delete row",
    },

    // {
    //   name: "mergeCells",
    //   icon: FluentTableCellsMerge20Regular,
    //   command: () => editor.chain().focus().mergeCells().run(),
    // },
    // {
    //   name: "splitCell",
    //   icon: FluentTableCellsSplit20Regular,
    //   command: () => editor.chain().focus().splitCell().run(),
    // },
    // {
    //   name: "toggleHeaderColumn",
    //   icon: FluentTableDeleteRow20Regular,
    //   command: () => editor.chain().focus().toggleHeaderColumn().run(),
    // },
    // {
    //   name: "toggleHeaderRow",
    //   icon: FluentTableDeleteRow20Regular,
    //   command: () => editor.chain().focus().toggleHeaderRow().run(),
    // },
    // {
    //   name: "toggleHeaderCell",
    //   icon: FluentTableDeleteRow20Regular,
    //   command: () => editor.chain().focus().toggleHeaderCell().run(),
    // },
    {
      name: "mergeOrSplit",
      icon: FluentTableCellsMerge20Regular,
      command: () => editor.chain().focus().mergeOrSplit().run(),
      isActive: () => editor.isActive("mergeOrSplit"),
      disabled: () => !editor.isActive("table"),
      tooltip: "Merge or split cells",
    },
  ];

  return { tableCommands };
}

import TableCell from "@tiptap/extension-table-cell";

export default TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: "left",
        parseHTML: (element) => element.getAttribute("align"),
        renderHTML: (attributes) => {
          return {
            align: attributes.align ? attributes.align : null,
          };
        },
      },
    };
  },
});

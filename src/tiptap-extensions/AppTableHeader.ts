import TableHeader from "@tiptap/extension-table-header";

export default TableHeader.extend({
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

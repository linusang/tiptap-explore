import "tippy.js/dist/tippy.css";

import tippy from "tippy.js";
import { Directive } from "vue";

export default <Directive<HTMLElement, string | undefined>>{
  mounted(el: HTMLElement, { value }) {
    if (!value) {
      return;
    }
    tippy(el, {
      content: value,
    });
  },
};

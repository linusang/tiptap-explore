import Differ from "@/pages/Differ.vue";
import Editor from "@/pages/Editor.vue";

const routes = [
  { path: "/", component: Editor },
  { path: "/diff", component: Differ },
];

export { routes };

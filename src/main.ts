import "./App.css";

import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import { routes } from "@/pages/routes";

import App from "./App.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");

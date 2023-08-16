import "./App.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import { routes } from "@/pages/routes";

import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");

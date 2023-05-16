// const s: string = 'hello ts'
// import { add } from "~/add";
// console.log(s + add(1,2));
// document.querySelector('#app')!.innerHTML = '你好啊，李银河'

import { createApp } from "vue";
import App from "./App.vue";

// 引入unocss
import "uno.css";

import "nprogress/nprogress.css"; //这个样式必须引入

// 引入vue-router
import { createRouter, createWebHistory } from "vue-router";
// import routes from '~pages'
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  history: createWebHistory(),
  //   routes: [
  //     {
  //       path: "/",
  //       name: "index",
  //       component: () => import("@/pages/index.vue"),
  //     },
  //     {
  //       path: "/login",
  //       name: "login",
  //       component: () => import("@/pages/login.vue"),
  //     },
  //   ],
  routes,
});

// 引入Pinia
// import {createPinia} from 'pinia'
// const pinia = createPinia()
const app = createApp(App);
// 自动加载
Object.values(import.meta.glob("./modules/*.ts", { eager: true })).forEach(
  (i: any) => i.install?.({ app, router })
);

app.use(router);

// app.use(pinia)

app.mount("#app");

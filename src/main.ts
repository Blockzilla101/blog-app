import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";

import SignUpView from "./views/SignUpView.vue";
import LoginView from "./views/LoginView.vue";
import TodoView from "./views/TodoView.vue";
import PageNotFound from "./views/PageNotFound.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/login" },
        { path: "/sign-up", component: SignUpView },
        { path: "/login", component: LoginView },
        { path: "/app", component: TodoView },
        { path: "/:pathMatch(.*)*", component: PageNotFound },
    ],
});

createApp(App)
  .use(router)
  .mount("#app");

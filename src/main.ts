import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";

import SignUpView from "./views/SignUpView.vue";
import LoginView from "./views/LoginView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/sign-up", component: SignUpView },
        { path: "/login", component: LoginView },
    ],
});

createApp(App)
  .use(router)
  .mount("#app");

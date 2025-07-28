import { createApp } from "vue";
import "./styles/main.css";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";

import SignUpView from "./views/SignUpView.vue";
import LoginView from "./views/LoginView.vue";
import PageNotFound from "./views/PageNotFound.vue";
import UserSettingsView from "./views/UserSettingsView.vue";
import BlogsView from "./views/BlogsView.vue";
import BlogView from "./views/BlogView.vue";
import EditBlogView from "./views/EditBlogView.vue";
import UserBlogsView from "./views/UserBlogsView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/login" },
        { path: "/sign-up", component: SignUpView },
        { path: "/login", component: LoginView },
        { path: "/settings", component: UserSettingsView },
        { path: "/blogs", component: BlogsView },
        { path: "/blogs/me", component: UserBlogsView },
        { path: "/blog/:uuid", component: BlogView },
        { path: "/blog/edit/:uuid", component: EditBlogView },
        { path: "/:pathMatch(.*)*", component: PageNotFound },
    ],
});

createApp(App)
  .use(router)
  .mount("#app");

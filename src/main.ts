import { createApp } from "vue";
import "./styles/main.css";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";

import SignUpView from "./views/SignUpView.vue";
import LoginView from "./views/LoginView.vue";
import ErrorPage from "./views/ErrorPage.vue";
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
        { path: "/blog/edit/:uuid", component: EditBlogView, props: true },
        { path: "/blog/:uuid", component: BlogView, props: true },
        {
            path: "/403", component: ErrorPage, props: {
                title: "403 Forbidden",
                description: "Sorry, you do not have permission to access this resource.",
            },
        },
        {
            path: "/:pathMatch(.*)*", component: ErrorPage, props: {
                title: "404 Page not found",
                description: "Sorry, the page you are looking for does not exist.",
            },
        },
    ],
});

createApp(App)
  .use(router)
  .mount("#app");

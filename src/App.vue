<script lang="ts" setup>

import { onMounted, ref } from "vue";
import { checkIfLoggedIn } from "./api/util.ts";
import type { AuthorizationResponse } from "./api/types.ts";
import AccountMenu from "./components/AccountMenu.vue";

const isLoggedIn = ref(false);

const account = ref<AuthorizationResponse["account"] | null>(null);

onMounted(async () => {
    isLoggedIn.value = await checkIfLoggedIn();

    if (isLoggedIn.value) {
        account.value = JSON.parse(localStorage.getItem("account")!);
    }
});

</script>

<template>
    <header>
        <nav>
            <div class="logo">
                <div>
                    <img alt="logo" src="/app-logo-dark.svg">
                </div>
                <h1>Todo App</h1>
            </div>
            <ul>
                <li v-if="isLoggedIn">
                    <AccountMenu :account="account!"></AccountMenu>
                </li>
                <li v-else-if="$route.path === '/login'">
                    <router-link class="link" to="/sign-up">
                        <span>Sign Up</span>
                    </router-link>
                </li>
                <li v-else>
                    <router-link class="link" to="/login">
                        <span>Login</span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <RouterView></RouterView>
    </main>

    <footer>
        <span>Copyright &copy; 2025</span>
    </footer>
</template>

<style scoped>
@import "tailwindcss";

nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid var(--foreground-color);
    background: var(--card-background-color);
    backdrop-filter: blur(12px);
    padding: 0 0 0 1em;
    height: 4em;
    font-weight: 800;
}

nav .logo {
    display: flex;
    font-size: 1.5em;
    gap: 0.5em
}

nav .logo img {
    max-height: 1.5em;
}

nav ul {
    display: flex;
    height: 100%;
}

.link {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 1.5em;
    height: 100%;
    overflow: hidden;
    font-size: 1.2em;
    transition: 0.2s ease-in-out;
}

.link::before {
    position: absolute;
    content: "";
    background: var(--foreground-color);
    width: 100%;
    height: 100%;
    left: 0;
    transform: translateY(100%);
    transition: 0.2s ease-in-out;
    z-index: -1;
}

.link:hover::before {
    transform: translateY(0);
}

.link:hover {
    color: var(--background-color);
}

footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--card-background-color);
    backdrop-filter: blur(12px);
    padding: 2em 0;
    font-weight: bolder;
}

</style>

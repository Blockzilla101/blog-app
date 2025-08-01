<script lang="ts" setup>

import { onMounted, ref } from "vue";
import { checkIfLoggedIn } from "./api/util.ts";
import type { AccountInfo } from "./api/types.ts";
import AccountMenu from "./components/AccountMenu.vue";
import { Backend } from "./api/backend.ts";

const isLoggedIn = ref(false);

const account = ref<AccountInfo | null>(null);

const saved = localStorage.getItem("account");
if (saved) {
    try {
        account.value = JSON.parse(saved) as AccountInfo;
    } catch (e) {
        console.error("Failed to parse saved account data:", e);
    }
}

onMounted(async () => {
    isLoggedIn.value = await checkIfLoggedIn();

    if (isLoggedIn.value) {
        account.value = await Backend.fetchSessionAccount();
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
                <h1>Blog App</h1>
            </div>
            <ul>
                <li>
                    <router-link class="link hover-invert" to="/blogs">
                        <span>Latest Blogs</span>
                    </router-link>
                </li>
                <li v-if="isLoggedIn && account">
                    <AccountMenu :account="account!"></AccountMenu>
                </li>
                <li v-else-if="$route.path === '/blogs'">
                    <router-link class="link hover-invert" to="/login">
                        <span>Create a Blog</span>
                    </router-link>
                </li>
                <li v-else-if="$route.path === '/login'">
                    <router-link class="link hover-invert" to="/sign-up">
                        <span>Sign Up</span>
                    </router-link>
                </li>
                <li v-else>
                    <router-link class="link hover-invert" to="/login">
                        <span>Login</span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <RouterView v-slot="{ Component }">
            <template v-if="Component">
                <Transition name="fade">
                    <KeepAlive>
                        <Suspense>
                            <component :is="Component" :account="account"></component>

                            <!--                            <template #fallback>-->
                            <!--                                <section class="card-section card-center">-->
                            <!--                                    <h1>Loading</h1>-->
                            <!--                                </section>-->
                            <!--                            </template>-->
                        </Suspense>
                    </KeepAlive>
                </Transition>
            </template>
        </RouterView>
    </main>

    <footer>
        <span>Copyright &copy; 2025</span>
    </footer>
</template>

<style scoped>
nav {
    position: relative;
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
    z-index: 1000;
}

nav .logo {
    display: flex;
    font-size: 1.5em;
    gap: 0.5em;
    align-items: center;
}

nav .logo img {
    display: block;
    height: 1.2em;
}

nav ul {
    display: flex;
    height: 100%;
}

.link {
    display: flex;
    align-items: center;
    padding: 0 1.5em;
    height: 100%;
    font-size: 1em;
}

main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    z-index: 0;
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

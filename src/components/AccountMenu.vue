<script lang="ts" setup>

import type { AccountInfo } from "../api/types.ts";
import { ref } from "vue";
import { Backend } from "../api/backend.ts";

defineProps({
    account: {
        type: Object as () => AccountInfo,
        required: true,
    },
});

const menuShown = ref(false);

function onClick() {
    menuShown.value = false;
}

async function handleLogout() {
    try {
        await Backend.logout();
    } catch (e) {
        // ignore errors
    }
    window.location.pathname = "/login";
}

document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest("#account-menu")) {
        menuShown.value = false;
    }
});

</script>

<template>
    <div id="account-menu" class="menu-container">
        <button :class="{ 'active': menuShown }" class="username hover-invert" @click="menuShown = !menuShown">
            <span>{{ account.firstName }}</span>
            <span class="last-name">{{ account.lastName }}</span>
        </button>
        <Transition name="slide-up">
            <div v-show="menuShown" class="menu">
                <RouterLink class="link hover-invert" to="/blogs/me" @click="onClick">
                    <span>Blogs</span>
                </RouterLink>
                <RouterLink class="link hover-invert" to="/settings" @click="onClick">
                    <span>Settings</span>
                </RouterLink>
                <button class="link hover-invert" @click="handleLogout">
                    Logout
                </button>
            </div>
        </Transition>
    </div>
</template>

<style scoped>

.menu-container {
    position: relative;
    height: 100%;
}

.menu {
    position: absolute;
    width: 100%;
    left: 0;
    top: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    background-color: var(--background-color);
    border: 2px solid var(--foreground-color);
    border-right: none;
    z-index: 1000;
}

.link {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 3em;
}

.username {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 0.25em;
    padding: 0 1em;
    height: 100%;
}

.active {
    background-color: var(--foreground-color);
    color: var(--background-color);
}

@media (max-width: 425px) {
    .last-name {
        display: none;
    }
}

</style>
<script lang="ts" setup>

import type { AuthorizationResponse } from "../api/types.ts";
import { ref } from "vue";
import { Backend } from "../api/backend.ts";

defineProps({
    account: {
        type: Object as () => AuthorizationResponse["account"],
        required: true,
    },
});

const menuShown = ref(false);

async function handleLogout() {
    try {
        await Backend.logout();
    } catch (e) {
        // ignore errors
    }
    window.location.pathname = "/login";
}

</script>

<template>
    <div class="container">
        <button :class="{ 'active': menuShown }" class="username hover-invert" @click="menuShown = !menuShown">
            <span>{{ account.firstName }}</span>
            <span class="last-name">{{ account.lastName }}</span>
        </button>
        <Transition name="slide-up">
            <div v-show="menuShown" class="menu">
                <button class="logout-btn hover-invert" @click="handleLogout">
                    Logout
                </button>
            </div>
        </Transition>
    </div>
</template>

<style scoped>

.container {
    position: relative;
    height: 100%;
}

.menu {
    position: absolute;
    height: 100%;
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

.logout-btn {
    cursor: pointer;
    height: 100%;
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
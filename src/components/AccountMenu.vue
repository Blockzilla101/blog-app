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
        <button class="username" @click="menuShown = !menuShown">
            <span>{{ account.firstName }}</span>
            <span class="last-name">{{ account.lastName }}</span>
        </button>
        <Transition name="slide-up">
            <div v-show="menuShown" class="menu">
                <button class="logout-btn" @click="handleLogout">
                    Logout
                </button>
            </div>
        </Transition>
    </div>
</template>

<style scoped>

.container {
    display: flex;
    align-items: center;
    position: relative;
    overflow: unset;
    height: 100%;
    padding: 0 1em;
}

.menu {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 100%;
    background-color: var(--background-color);
    border: 2px solid var(--foreground-color);
    border-right: none;
}

.logout-btn {
    cursor: pointer;
    height: 100%;
}

.username {
    cursor: pointer;
    display: flex;
    gap: 0.25em
}

@media (max-width: 425px) {
    .last-name {
        display: none;
    }

}

</style>
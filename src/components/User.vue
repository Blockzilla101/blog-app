<script lang="ts" setup>

import type { AccountInfo } from "../api/types.ts";

defineProps({
    user: {
        type: Object as () => Pick<AccountInfo, "firstName" | "lastName" | "bio">,
        required: true,
    },
});

</script>

<template>
    <div class="avatar-container">
        <img alt="Profile Picture" class="avatar" src="/avatar-default.svg" />
        <div class="avatar-text">
            <h2>{{ user.firstName }} {{ user.lastName }}</h2>
            <p>{{ user.bio }}</p>
        </div>
    </div>
</template>

<style scoped>

.avatar-container {
    max-width: 35em;
    display: flex;
    align-items: center;
    gap: 0.5em;
}

.avatar-text h2 {
    font-size: 1.5em;
    font-weight: 800;
    color: var(--text-color);
    word-wrap: anywhere;
}

.avatar-text p {
    font-size: 1em;
    color: var(--text-color);
    text-align: start;
    overflow-wrap: anywhere;
}

.avatar {
    width: 7.5em;
    height: 7.5em;
    border-radius: 50%;
    object-fit: cover;
}

</style>
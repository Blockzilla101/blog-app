<script lang="ts" setup>

import User from "./User.vue";
import type { BlogItem } from "../api/types.ts";

// todo add a partial mode

defineProps({
    blog: {
        type: Object as () => BlogItem,
        required: true,
    },
});

</script>

<template>
    <section class="card-section blog-container">
        <h1 class="blog-title">{{ blog.title }}</h1>
        <p class="blog-content">{{ blog.content }}</p>
        <User :user="blog.author" class="text-sm" />
    </section>
</template>

<style scoped>

.blog-container {
    align-items: start;
    width: 80%;
}

.blog-title {
    margin-bottom: 0.85em;
}

.blog-content {
    text-align: start;
    white-space: pre-line;
}

</style>
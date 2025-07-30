<script lang="ts" setup>

import Blog from "./Blog.vue";
import type { AccountInfo, BlogItem } from "../api/types.ts";

defineProps({
    account: {
        type: Object as () => AccountInfo | undefined | null,
        required: true,
    },
    blogs: {
        type: Array as () => BlogItem[],
        required: true,
    },
    allLoaded: {
        type: Boolean,
        default: false,
    },
});

defineEmits({
    "load-more": () => Promise<void>,
});

function openBlog(blog: BlogItem) {
    window.location.pathname = `/blog/${blog.uuid}`;
}

</script>

<template>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
        <Blog v-for="blog in blogs" :key="blog.uuid" :account="account" :blog="blog" :preview="true"
              class="blog-preview xl:odd:last:col-span-2" @click="openBlog(blog)"></Blog>
    </div>
    <button v-if="!allLoaded" class="btn" @click="$emit('load-more')">
        Load More
    </button>
</template>

<style scoped>

.blog-preview {
    cursor: pointer;
    transition: 0.3s ease;
}

.blog-preview:hover {
    background-color: var(--card-background-color-darker);
}

.btn {
    margin-top: 2em;
    background-color: var(--background-color);
    backdrop-filter: blur(12px);
}

</style>
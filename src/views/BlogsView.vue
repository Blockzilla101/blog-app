<script lang="ts" setup>

import type { BlogItem } from "../api/types.ts";
import { ref } from "vue";
import { Backend } from "../api/backend.ts";
import Blog from "../components/Blog.vue";

const blogs = ref<BlogItem[]>([
    await Backend.fetchBlog("1"),
    await Backend.fetchBlog("2"),
    await Backend.fetchBlog("3"),
    await Backend.fetchBlog("4"),
    await Backend.fetchBlog("5"),
]);

const account = ref(await Backend.fetchSessionAccount(false));

async function loadMore() {
    const amount = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < amount; i++) {
        blogs.value.push(
          await Backend.fetchBlog((blogs.value.length + 1).toString()),
        );
    }
}

function openBlog(blog: BlogItem) {
    window.location.pathname = `/blog/${blog.uuid}`;
}

</script>

<template>
    <section class="blog-section">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Blog v-for="blog in blogs" :key="blog.uuid" :account="account" :blog="blog" :preview="true"
                  class="blog-preview" @click="openBlog(blog)"></Blog>
        </div>
        <button class="btn" @click="loadMore">
            Load More
        </button>
    </section>
</template>

<style scoped>

.blog-section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

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
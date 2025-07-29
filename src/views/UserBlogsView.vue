<script lang="ts" setup>

import type { BlogItem } from "../api/types.ts";
import { ref } from "vue";
import { Backend } from "../api/backend.ts";
import BlogList from "../components/BlogList.vue";

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

</script>

<template>
    <section class="card blog-section">
        <div class="flex self-start justify-between w-full">
            <h1 class="underline underline-offset-5">Your Blogs</h1>
            <button class="btn max-h-10">New Blog</button>
        </div>
        <p class="self-start">
            Click on a blog to view it, or click the "Load More" button to load more blogs.
        </p>
        <p v-if="blogs.length === 0" class="card">
            You currently have no blogs. Click the "Create new blog" button to create your first blog.
        </p>
        <BlogList v-else :account="account" :all-loaded="blogs.length >= 20" :blogs="blogs"
                  @load-more="loadMore">
        </BlogList>
    </section>
</template>

<style scoped>

</style>
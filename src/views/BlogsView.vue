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
    <BlogList :account="account" :all-loaded="blogs.length >= 20" :blogs="blogs" @load-more="loadMore"></BlogList>
</template>

<style scoped>

</style>
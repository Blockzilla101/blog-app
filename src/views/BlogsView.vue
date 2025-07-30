<script lang="ts" setup>

import type { AccountInfo, BlogItem } from "../api/types.ts";
import { ref } from "vue";
import { Backend } from "../api/backend.ts";
import BlogList from "../components/BlogList.vue";

defineProps({
    account: {
        type: Object as () => AccountInfo | null,
        required: true,
    },
});

const blogs = ref<BlogItem[]>([]);

let cursor: string | null = null;
const hasNext = ref(false);

async function loadMore() {
    const list = await Backend.fetchBlogs({ after: cursor ?? undefined });
    blogs.value.push(...list.blogs);

    hasNext.value = list.hasNext;
    cursor = list.next;
}

await loadMore();

</script>

<template>
    <section v-if="blogs.length === 0" class="card card-center">
        <h1>No Blogs</h1>
        <p>No one has created any blogs. Sign up to create blogs</p>
    </section>
    <section v-else class="card blog-section">
        <BlogList :account="account" :all-loaded="!hasNext" :blogs="blogs" @load-more="loadMore"></BlogList>
    </section>
</template>

<style scoped>

</style>
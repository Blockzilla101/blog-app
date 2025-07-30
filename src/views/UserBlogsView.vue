<script lang="ts" setup>

import type { AccountInfo, BlogItem } from "../api/types.ts";
import { ref } from "vue";
import { Backend } from "../api/backend.ts";
import BlogList from "../components/BlogList.vue";

const props = defineProps({
    account: {
        type: Object as () => AccountInfo | null,
        required: true,
    },
});

const blogs = ref<BlogItem[]>([]);

let cursor: string | null = null;
const hasNext = ref(false);

if (!props.account) {
    window.location.pathname = "/login";
}

async function loadMore() {
    const list = await Backend.fetchBlogs({ after: cursor ?? undefined, author: props.account!.uuid });
    blogs.value.push(...list.blogs);

    hasNext.value = list.hasNext;
    cursor = list.next;
}

function createBlog() {
    window.location.pathname = "/blog/edit/new";
}

await loadMore();

</script>

<template>
    <section class="card blog-section">
        <div class="flex self-start justify-between w-full">
            <h1 class="underline underline-offset-5">Your Blogs</h1>
            <button class="btn max-h-10" @click="createBlog">New Blog</button>
        </div>
        <p class="self-start">
            Click on a blog to view or edit it, or click the "Load More" button to load more blogs.
        </p>
        <p v-if="blogs.length === 0" class="card">
            You currently have no blogs. Click the "Create new blog" button to create your first blog.
        </p>
        <BlogList v-else :account="account" :all-loaded="!hasNext" :blogs="blogs"
                  @load-more="loadMore">
        </BlogList>
    </section>
</template>

<style scoped>

</style>
<script lang="ts" setup>

import Blog from "../components/Blog.vue";
import { Backend } from "../api/backend.ts";

const props = defineProps({
    uuid: {
        type: String,
        required: true,
    },
});

const account = await Backend.fetchSessionAccount();
const blog = await Backend.fetchBlog(props.uuid);

</script>

<template>
    <div class="blog-view">
        <Blog :account="account" :blog="blog"></Blog>
    </div>
</template>

<style scoped>

.blog-view {
    width: 80%;
    max-width: 80em;
}

@media (max-width: 768px) {
    .blog-view {
        width: 100%;
    }

    .blog-view .card-section {
        margin-top: 0;
    }
}

</style>
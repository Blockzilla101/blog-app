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
    <div class="blog-section">
        <Blog :account="account" :blog="blog"></Blog>
    </div>
</template>

<style scoped>

</style>
<script lang="ts" setup>

import Blog from "../components/Blog.vue";
import { Backend } from "../api/backend.ts";
import type { AccountInfo, BlogItem } from "../api/types.ts";

const props = defineProps({
    uuid: {
        type: String,
        required: true,
    },
    account: {
        type: Object as () => AccountInfo | null,
        required: true,
    },
});

let blog: BlogItem;

try {
    blog = await Backend.fetchBlog(props.uuid);
} catch (e) {
    window.location.pathname = "/404";
}

</script>

<template>
    <div class="blog-section">
        <Blog :account="account" :blog="blog"></Blog>
    </div>
</template>

<style scoped>

</style>
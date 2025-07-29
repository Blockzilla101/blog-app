<script lang="ts" setup>

import User from "./User.vue";
import type { AccountInfo, BlogItem } from "../api/types.ts";
import { computed } from "vue";
import { useRoute } from "vue-router";

// todo add a partial mode

const route = useRoute();

const props = defineProps({
    blog: {
        type: Object as () => BlogItem,
        required: true,
    },
    account: {
        type: Object as () => AccountInfo,
        required: false,
    },
    preview: {
        type: Boolean,
        default: false,
    },
});

const editingAllowed = computed(() => {
    if (route.path.startsWith("/blog/edit")) {
        return false;
    }

    if (props.preview) {
        return false;
    }

    if (!props.account) {
        return false;
    }

    return props.blog.author.uuid === props.account.uuid;
});

const content = computed(() => {
    if (props.preview) {
        return props.blog.content.slice(0, 400) + (props.blog.content.length > 200 ? "..." : "");
    }
    return props.blog.content;
});

function onEdit() {
    window.location.pathname = `/blog/edit/${props.blog.uuid}`;
}

</script>

<template>
    <section class="card blog-container">
        <div class="flex justify-between items-start w-full">
            <h1 class="blog-title">{{ blog.title }}</h1>
            <button v-show="editingAllowed" class="icon-btn icon-btn-primary" @click="onEdit">
                <img alt="Complete Todo" src="/edit-dark.svg">
            </button>
        </div>
        <p class="blog-content">{{ content }}</p>
        <User :user="blog.author" class="text-sm" />
    </section>
</template>

<style scoped>

.blog-container {
    align-items: start;
}

.blog-title {
    margin-bottom: 0.85em;
}

.blog-content {
    text-align: start;
    white-space: pre-line;
}

</style>
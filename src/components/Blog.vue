<script lang="ts" setup>

import User from "./User.vue";
import type { AccountInfo, BlogItem } from "../api/types.ts";
import { computed } from "vue";
import { useRoute } from "vue-router";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

const route = useRoute();
const timeAgo = new TimeAgo("en-US");

const props = defineProps({
    blog: {
        type: Object as () => BlogItem,
        required: true,
    },
    account: {
        type: Object as () => AccountInfo | null | undefined,
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
        return props.blog.content.slice(0, 400);
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
        <div class="create-time">
            <span>posted {{ timeAgo.format(blog.createdAt) }}</span>
            <span>{{ new Date(blog.createdAt).toISOString()
                                             .slice(0, 10) }}</span>
        </div>
        <p :class="{ preview }" class="blog-content">{{ content }}</p>
        <span v-if="preview" class="preview-text">read more...</span>
        <User :user="blog.author" class="text-sm mt-3" />
    </section>
</template>

<style scoped>

.blog-container {
    align-items: start;
    width: 100%;
}

.blog-title {
    margin-bottom: 0;
}

.create-time {
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: color-mix(in srgb, var(--primary-color), black 20%);
    font-style: italic;
    margin: 0 0 0.85em;
}

.blog-content {
    text-align: start;
    white-space: pre-line;
    word-wrap: anywhere;
    flex-grow: 1;
    min-height: 30em;
    margin: 0.5em;
}

.preview-text {
    width: 100%;
    text-align: right;
    color: color-mix(in srgb, var(--primary-color), black 20%);
    font-style: italic;
    font-size: 1.2em;
}

.preview {
    position: relative;
    min-height: 20em;
    max-height: 20em;
    overflow: hidden;
}


</style>
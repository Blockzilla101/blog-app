<script lang="ts" setup>

import type { AccountInfo, BlogItem } from "../api/types.ts";
import { computed, ref } from "vue";
import { Backend } from "../api/backend.ts";

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

if (!props.account) {
    window.location.pathname = "/login";
}

const isNew = computed(() => props.uuid === "new");

const errorText = ref("");

const blog = ref<Pick<BlogItem, "title" | "content" | "uuid">>({
    title: "",
    content: "",
    uuid: props.uuid,
});

if (!isNew.value) {
    const fetchedBlog = await Backend.fetchBlog(props.uuid);
    blog.value.title = fetchedBlog.title;
    blog.value.content = fetchedBlog.content;
}

async function formSubmit(event: Event) {
    event.preventDefault();
    errorText.value = "";

    blog.value.title = blog.value.title.trim();
    blog.value.content = blog.value.content.trim();

    try {
        let uuid = blog.value.uuid;
        if (isNew.value) {
            const value = await Backend.createBlog(blog.value);
            uuid = value.uuid;
        } else {
            await Backend.updateBlog(props.uuid, blog.value);
        }
        window.location.pathname = `/blog/${uuid}`;
    } catch (e) {
        if (e instanceof Error) {
            errorText.value = e.message;
        } else {
            errorText.value = "An unknown error occurred.";
        }
    }
}

</script>

<template>
    <section class="card blog-section">
        <form class="form blog-form" @submit="formSubmit">
            <input v-model="blog.title" class="input blog-title" maxlength="100" min="1" placeholder="Your blog title"
                   required
                   type="text" />

            <textarea v-model="blog.content" class="input blog-content" maxlength="4096" minlength="50"
                      placeholder="Your blog content" required />

            <div class="label-container">
                <span class="error-text">{{ errorText }}</span>
                <button class="btn" type="submit">{{ isNew ? "Create" : "Save" }}</button>
            </div>
        </form>
    </section>
</template>

<style scoped>

.blog-form {
    border: none;
    align-items: stretch;
}

.input {
    padding: 0.75rem 12px;
    border-radius: 12px;
    transition: background-color 0.3s ease;
}

.input:focus {
    outline: none;
    background-color: var(--card-background-color-darker);
}

.blog-title {
    font-size: 2em;
    font-weight: 800;
}

.blog-content {
    font-size: 1.2em;
}

</style>
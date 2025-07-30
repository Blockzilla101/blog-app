<script lang="ts" setup>

import type { AccountInfo } from "../api/types.ts";
import { computed } from "vue";

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

</script>

<template>
    <section class="card card-section card-center">
        <h1 class="text-blue-400">TODO: To be implemented</h1>
        <p>Allow editing or creating a new blog here</p>
    </section>
</template>

<style scoped>

</style>
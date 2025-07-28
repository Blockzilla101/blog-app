<script lang="ts" setup>

import type { AccountInfo } from "../api/types.ts";

defineProps({
    account: {
        type: Object as () => AccountInfo,
        required: true,
    },
});

</script>

<template>
    <section class="card-section card-center">
        <h1 class="text-blue-400">TODO: To be implemented</h1>
        <p>Show user's settings page here</p>
    </section>
</template>

<style scoped>

</style>
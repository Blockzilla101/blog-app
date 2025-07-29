<script lang="ts" setup>

defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

</script>

<template>
    <section class="card card-section card-center">
        <h1 class="error-text">{{ title }}</h1>
        <p>{{ description }}</p>
    </section>
</template>

<style scoped>
</style>
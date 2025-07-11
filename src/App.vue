<script lang="ts" setup>
</script>

<template>
    <main>
        <RouterView v-slot="{ Component }">
            <Transition name="fade">
                <component :is="Component" />
            </Transition>
        </RouterView>
    </main>
</template>

<style scoped>
</style>

<script lang="ts" setup>

import TodoList from "../components/TodoList.vue";
import { onMounted, ref } from "vue";
import { Backend } from "../api/backend.ts";
import type { AccountInfo } from "../api/types.ts";

const account = ref<AccountInfo | null>(null);

onMounted(async () => {
    account.value = await Backend.fetchSessionInfo();
});

</script>

<template>
    <section v-if="account == null" class="card-section">
        <h1>Loading...</h1>
    </section>
    <div v-else class="list-container">
        <TodoList v-for="list in account.todoLists" :key="list.uuid" :list="list"></TodoList>
    </div>
</template>

<style scoped>

</style>
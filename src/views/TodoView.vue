<script lang="ts" setup>

import TodoList from "../components/TodoList.vue";
import { onMounted, ref } from "vue";
import { Backend } from "../api/backend.ts";
import type { AccountInfo } from "../api/types.ts";
import { checkIfLoggedIn } from "../api/util.ts";

const account = ref<AccountInfo | null>(null);

onMounted(async () => {
    if (await checkIfLoggedIn()) {
        account.value = await Backend.fetchSessionInfo();
    } else {
        window.location.pathname = "/login";
    }
});

</script>

<template>
    <Transition name="fade">
        <section v-if="account == null" class="card-section card-center">
            <h1>Loading...</h1>
        </section>
        <div v-else class="list">
            <TodoList v-for="list in account.todoLists" :key="list.uuid" :list="list"></TodoList>
        </div>
    </Transition>
</template>

<style scoped>

.list {
    width: 100%;
    max-width: 60em;
}

</style>
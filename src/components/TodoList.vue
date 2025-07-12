<script lang="ts" setup>

import { ref } from "vue";
import TodoItem from "./TodoItem.vue";

const todos = ref([
    { id: 2, text: "Build a Todo App".repeat(15), completed: false },
    { id: 3, text: "Deploy to Production", completed: false },
    { id: 1, text: "Learn Vue.js", completed: true },
]);

</script>

<template>
    <section class="todo-list-section">
        <h1>Your Todo List</h1>
        <button class="btn">Add New</button>

        <div class="user-input">
            <label>Show Completed</label>
            <input type="checkbox">
        </div>

        <ul class="todo-items">
            <TodoItem v-for="item in todos" :key="item.id" :todo="item">
            </TodoItem>
        </ul>
    </section>
</template>

<style scoped>

.todo-list-section {
    background: var(--card-background-color);
    backdrop-filter: blur(12px);
    padding: 2em 3em;
    border-radius: 1em;
}

.todo-list-section h1 {
    font-size: 2em;
    font-weight: 800;
    margin-bottom: 0.5em;
    color: var(--text-color);
    text-decoration: underline;
    text-underline-offset: 0.125em;
}

.todo-items {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

</style>
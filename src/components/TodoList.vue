<script lang="ts" setup>

import TodoItem from "./TodoItem.vue";
import type { TodoItem as TodoItemObj, TodoList } from "../api/types.ts";
import { ref } from "vue";
import { Backend } from "../api/backend.ts";

const props = defineProps({
    list: {
        required: true,
        type: Object as () => TodoList,
    },
});

const newTodo = ref<TodoItemObj | null>(null);

function addTodo() {
    newTodo.value = {
        title: "",
        uuid: "new-todo",
        completed: false,
    };
}

async function onTodoUpdate(item: TodoItemObj) {
    if (item.uuid === "new-todo" && newTodo.value) {
        if (newTodo.value.title.length === 0) {
            newTodo.value = null;
            return;
        }

        const item = await Backend.createTodo(props.list.uuid, { title: newTodo.value.title });
        props.list.items.unshift(item);

        newTodo.value = null;
        return;
    }

    await Backend.updateTodo(props.list.uuid, item.uuid, item);
}

async function onTodoDelete(uuid: string) {
    const idx = props.list.items.findIndex(i => i.uuid === uuid);
    await Backend.deleteTodo(props.list.uuid, uuid);
    props.list.items.splice(idx, 1);
}

async function onTodoComplete(item: TodoItemObj) {
    item.completed = !item.completed;
    await Backend.updateTodo(props.list.uuid, item.uuid, item);
}

</script>

<template>
    <section class="list-container">
        <div class="title-container">
            <h1>{{ $props.list.name }}</h1>
            <button class="icon-btn icon-btn-primary" @click="addTodo">
                <img alt="Add Todo" src="/plus.svg">
            </button>
        </div>

        <!--        <div class="input-container">-->
        <!--            <label>Show Completed</label>-->
        <!--            <input type="checkbox">-->
        <!--        </div>-->

        <div v-if="list.items.length === 0 && newTodo == null" class="empty-list-container">
            You currently have no items, use the add buttons to add tasks.
        </div>

        <ul class="todo-items">
            <TodoItem v-if="newTodo != null" v-model="newTodo" :is-new="true" @focus-out="onTodoUpdate">
            </TodoItem>
            <TodoItem v-for="(item, idx) in list.items" :key="item.uuid"
                      v-model="list.items[idx]"
                      @complete="onTodoComplete" @delete="onTodoDelete" @focus-out="onTodoUpdate">
            </TodoItem>
        </ul>
    </section>
</template>

<style scoped>
@import "tailwindcss";

.list-container {
    background: var(--card-background-color);
    backdrop-filter: blur(12px);
    padding: 2em 3em;
    border-radius: 1em;
    width: 60em;
    margin: 5em 0;
}

.list-container h1 {
    font-size: 2em;
    font-weight: 800;
    margin-bottom: 0.5em;
    color: var(--text-color);
    text-decoration: underline;
    text-underline-offset: 0.125em;
}

.title-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2em;
}

.title-container img {
    max-height: 2em;
}

.empty-list-container {
    font-weight: bold;
    justify-self: center;
    margin: 2em 0;
    color: color-mix(in srgb, var(--primary-color), black 60%);
}

.todo-items {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

</style>
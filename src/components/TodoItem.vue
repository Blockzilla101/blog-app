<script lang="ts" setup>

import type { TodoItem } from "../api/types.ts";
import { onMounted, ref, type VNodeRef } from "vue";

const props = defineProps({
    isNew: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits({
    focusOut: (uuid: string) => Promise<void>,
});

const inputElement = ref<VNodeRef | null>(null);

const itemModel = defineModel({
    type: Object as () => TodoItem,
    required: true,
});

onMounted(() => {
    if (props.isNew) {
        inputElement.value?.focus();
    }
});

</script>

<template>
    <li :class="{ completed: itemModel.completed }" class="todo-item">
        <input ref="inputElement" v-model="itemModel.title" class="title" maxlength="50"
               @focusout="$emit('focusOut', itemModel.uuid)">
        <div class="todo-actions">
            <button class="icon-btn icon-btn-primary">
                <img alt="Complete Todo" src="/checkmark-dark.svg">
            </button>
            <button class="icon-btn icon-btn-danger">
                <img alt="Delete Todo" src="/trash-dark.svg">
            </button>
        </div>
    </li>
</template>

<style scoped>

.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--foreground-color);
    background-color: var(--card-background-color);
    backdrop-filter: blur(12px);
    font-weight: bold;
    font-size: 1.2em;
    padding: 0.5em 0.75em;
    transition: 0.2s ease-in-out;
}

.todo-item .title {
    flex-grow: 1;
    outline: none;
}

.todo-item:focus-within {
    border-color: var(--primary-color);
    background-color: color-mix(in srgb, var(--card-background-color), var(--primary-color) 10%);
    text-overflow: ellipsis;
}

.completed {
    text-decoration: line-through;
    color: color-mix(in srgb, var(--text-color), white 50%);
}

.icon-btn {
    opacity: 0;
}

.todo-item:hover .icon-btn, .todo-item:focus-within .icon-btn {
    opacity: 1;
}

.todo-actions {
    display: flex;
    gap: 0.5em;
    width: 0;
    transition: 0.2s;
}

.todo-item:hover .todo-actions, .todo-item:focus-within .todo-actions {
    width: unset;
}

.icon-btn img {
    height: 1.5em;
}

</style>
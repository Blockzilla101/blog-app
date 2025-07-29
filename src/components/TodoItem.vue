<script lang="ts" setup>

import type { TodoItem } from "../api/types.ts";
import { computed, onMounted, ref, type VNodeRef } from "vue";

const props = defineProps({
    isNew: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits({
    // @ts-ignore
    update: (item: TodoItem) => Promise<void>,
    // @ts-ignore
    complete: (item: TodoItem) => Promise<void>,
    // @ts-ignore
    delete: (uuid: string) => Promise<void>,
});

const inputElement = ref<VNodeRef | null>(null);

const itemModel = defineModel({
    type: Object as () => TodoItem,
    required: true,
});

const dateInput = ref<HTMLInputElement | null>(null);

const dateInputValue = computed(() => {
    if (itemModel.value.dueDate == 0) {
        return "";
    }
    return new Date(itemModel.value.dueDate).toISOString()
                                            .slice(0, 10);
});

const pastDue = computed(() => {
    return itemModel.value.dueDate < Date.now() && itemModel.value.dueDate !== 0 && !itemModel.value.completed;
});

async function showPicker() {
    if (dateInput.value) {
        dateInput.value.showPicker();
    }
}

function datePicked(target: HTMLInputElement) {
    itemModel.value.dueDate = target.valueAsNumber;
    emit("update", itemModel.value);
}

onMounted(() => {
    if (props.isNew) {
        inputElement.value?.focus();
    }
});

</script>

<template>
    <li :class="{ completed: itemModel.completed }" class="todo-item">
        <input ref="inputElement" v-model="itemModel.title" :class="{ completed: itemModel.completed }" class="title"
               maxlength="50"
               @focusout="$emit('update', itemModel)">
        <span :class="{ 'error-text':pastDue }" class="due-date">{{ dateInputValue }}</span>
        <div class="todo-actions">
            <button class="icon-btn icon-btn-primary flex">
                <input ref="dateInput" :value="dateInputValue" class="opacity-0 w-0"
                       type="date" @change="datePicked($event.target as HTMLInputElement)">
                <img alt="Due Date" src="/calendar-dark.svg" @click="showPicker">
            </button>
            <button class="icon-btn icon-btn-primary">
                <img alt="Complete Todo" src="/checkmark-dark.svg" @click="$emit('complete', itemModel)">
            </button>
            <button class="icon-btn icon-btn-danger">
                <img alt="Delete Todo" src="/trash-dark.svg" @click="$emit('delete', itemModel.uuid)">
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
    min-width: 2em;
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

.due-date {
    opacity: 1;
    font-size: 0.8em;
    transition: 0.2s ease-in-out;
    text-wrap: nowrap;
    padding-left: 0.5em;
}

.todo-item:hover .due-date, .todo-item:focus-within .due-date {
    opacity: 0;
    width: 0;
    transition: 0s;
}

</style>
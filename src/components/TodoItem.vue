<script lang="ts" setup>

defineProps({
    todo: {
        type: Object,
        required: true,
    },
});

</script>

<template>
    <li :class="{ completed: todo.completed }" class="todo-item">
        <input :value="todo.text" class="title" maxlength="50">
        <div class="todo-actions">
            <button class="btn-complete">
                <img alt="Complete Todo" src="/checkmark-dark.svg">
            </button>
            <button class="btn-delete">
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

.todo-item button {
    opacity: 0;
    background-color: transparent;
    cursor: pointer;
    padding: 0.25em;
    transition: 0.2s ease-in-out;
}

.todo-item:hover button {
    opacity: 1;
}

.btn-complete:hover {
    filter: invert(42%) sepia(76%) saturate(1842%) hue-rotate(163deg) brightness(97%) contrast(101%);
}

.btn-delete:hover {
    filter: invert(42%) sepia(66%) saturate(516%) hue-rotate(309deg) brightness(111%) contrast(117%);
}

.todo-actions {
    display: flex;
    gap: 0.5em;
    width: 0;
    transition: 0.2s;
}

.todo-item:hover .todo-actions {
    width: unset;
}

.todo-actions img {
    height: 1.5em;
}

</style>
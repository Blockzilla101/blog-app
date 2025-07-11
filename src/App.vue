<script lang="ts" setup>
</script>

<template>
    <header>
        <nav>
            <div class="logo">
                <div>
                    <img alt="logo" src="/placeholder.svg">
                </div>
                <h1>Todo App</h1>
            </div>
            <ul>
                <li>
                    <router-link to="/login">Login</router-link>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <RouterView></RouterView>
    </main>
</template>

<style scoped>

nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid var(--foreground-color);
    backdrop-filter: blur(12px);
    padding: 0 0 0 2em;
    height: 4em;
    font-weight: 800;
}

nav .logo {
    display: flex;
    font-size: 1.5em;
    gap: 0.5em
}

nav .logo img {
    max-height: 1.5em;
}

nav ul {
    display: flex;
    height: 100%;
}

nav ul li {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 2em;
    font-size: 1.2em;
    transition: 0.2s ease-in-out;
    overflow: hidden;
}

nav ul li::before {
    position: absolute;
    content: "";
    background: var(--foreground-color);
    width: 100%;
    height: 100%;
    left: 0;
    transform: translateY(100%);
    transition: 0.2s ease-in-out;
    z-index: -1;
}

nav ul li:hover::before {
    transform: translateY(0);
}

nav ul li:hover {
    color: var(--background-color);
}

</style>

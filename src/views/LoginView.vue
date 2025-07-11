<script lang="ts" setup>

</script>

<template>
    <section>
        <h1>Login</h1>

        <form class="form">
            <div class="user-input">
                <label>Email</label>
                <input placeholder="you@provider.com" type="email" />
            </div>

            <div class="user-input">
                <label>Password</label>
                <input placeholder="Your password" type="password" />
            </div>

            <button class="btn" type="submit">Login</button>
        </form>

        <div class="alternative">
            <span class="or"><span>OR</span></span>
            <router-link class="link" to="/sign-up">Create an account</router-link>
        </div>
    </section>
</template>

<style scoped>


</style>
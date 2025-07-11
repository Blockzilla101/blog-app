<script lang="ts" setup>

</script>

<template>
    <section class="account-section">
        <h1>Sign Up</h1>
        <p>Create your account today to start organizing your tasks.</p>

        <form class="form">
            <div class="user-input">
                <label>First Name</label>
                <input placeholder="First name" type="text" />
            </div>

            <div class="user-input">
                <label>Last name</label>
                <input placeholder="Last name" type="text" />
            </div>

            <div class="user-input">
                <label>Email</label>
                <input placeholder="you@provider.com" type="email" />
            </div>

            <div class="user-input">
                <label>Password</label>
                <input placeholder="Choose a strong password" type="password" />
            </div>

            <button class="btn" type="submit">Sign Up</button>
        </form>

        <div class="alternative">
            <span class="or"><span>OR</span></span>
            <router-link class="link" to="/login">Already have an account?</router-link>
        </div>
    </section>
</template>

<style scoped>
</style>
<script lang="ts" setup>
import { ref } from "vue";
import { ApiError, Backend } from "../api/backend.ts";

const errorText = ref("");

const email = ref("");
const password = ref("");

async function formSubmit(event: Event) {
    event.preventDefault();

    try {
        await Backend.login({
            email: email.value,
            password: password.value,
        });
    } catch (e) {
        errorText.value = "";

        if (e instanceof ApiError && e.errors.length > 0) {
            if (e.errors.find(e => e.msg.includes("Invalid email or password"))) {
                errorText.value = "Invalid email or password";
            } else {
                errorText.value = "An unknown error occurred.";
            }
        } else if (e instanceof Error) {
            errorText.value = e.message;
        } else {
            errorText.value = "An unknown error occurred.";
        }

        return;
    }
    errorText.value = "";

    // todo save session & redirect to todo view
    console.log("Form submitted");

}
</script>

<template>
    <section class="card-section">
        <h1>Login</h1>
        <p>Login to view your tasks. Create an account if you don't have one.</p>

        <form class="form" @submit="formSubmit">
            <div class="input-container">
                <label>Email</label>
                <input v-model="email" maxlength="100" min="1" placeholder="email@provider.com" required type="email" />
            </div>

            <div class="input-container">
                <label>Password</label>
                <input v-model="password" minlength="8" placeholder="Your password" required type="password" />
            </div>

            <div class="label-container">
                <span class="error-text">{{ errorText }}</span>
                <button class="btn" type="submit">Login</button>
            </div>
        </form>

        <div class="alternative">
            <span class="or"><span>OR</span></span>
            <router-link class="link" to="/sign-up">Don't have an account?</router-link>
        </div>
    </section>
</template>

<style scoped>

.label-container:last-child {
    margin: 2em 0 0.5em 0;
}

</style>
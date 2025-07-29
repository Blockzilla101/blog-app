<script lang="ts" setup>

import { onMounted, ref } from "vue";
import { ApiError, Backend } from "../api/backend.ts";
import { applyErrorsToRef, checkIfLoggedIn } from "../api/util.ts";

const errors = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    unknownError: "",
});

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

function clearErrors() {
    errors.value.firstName = "";
    errors.value.lastName = "";
    errors.value.email = "";
    errors.value.password = "";
    errors.value.unknownError = "";
}

async function formSubmit(event: Event) {
    event.preventDefault();

    try {
        await Backend.signUp({
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value,
        });
    } catch (e) {
        clearErrors();

        if (e instanceof ApiError && e.errors.length > 0) {
            applyErrorsToRef(errors.value, e.errors);
        } else if (e instanceof Error) {
            errors.value.unknownError = e.message;
        } else {
            errors.value.unknownError = "An unknown error occurred.";
        }

        return;
    }
    clearErrors();

    window.location.pathname = "/settings";
}

onMounted(async () => {
    if (await checkIfLoggedIn()) {
        window.location.pathname = "/app";
    }
});

</script>

<template>
    <section class="card card-section">
        <h1>Sign Up</h1>
        <p>Create your account today to start organizing your tasks.</p>

        <form class="form" @submit="formSubmit">
            <div class="input-container">
                <div class="label-container">
                    <label>First Name</label>
                    <span class="error-text">{{ errors.firstName }}</span>
                </div>
                <input v-model="firstName" maxlength="25" minlength="2" placeholder="First name" required type="text" />
            </div>

            <div class="input-container">
                <div class="label-container">
                    <label>Last Name</label>
                    <span class="error-text">{{ errors.lastName }}</span>
                </div>
                <input v-model="lastName" maxlength="25" minlength="2" placeholder="Last name" required type="text" />
            </div>

            <div class="input-container">
                <div class="label-container">
                    <label>Email</label>
                    <span class="error-text">{{ errors.email }}</span>
                </div>
                <input v-model="email" maxlength="100" minlength="1" placeholder="email@provider.com" required
                       type="email" />
            </div>

            <div class="input-container">
                <div class="label-container">
                    <label>Password</label>
                    <span class="error-text">{{ errors.password }}</span>
                </div>
                <input v-model="password" minlength="8" placeholder="Choose a strong password" required
                       type="password" />
            </div>

            <div class="label-container">
                <span class="error-text">{{ errors.unknownError }}</span>
                <button class="btn" type="submit">Sign Up</button>
            </div>
        </form>

        <div class="alternative">
            <span class="or"><span>OR</span></span>
            <router-link class="link" to="/login">Already have an account?</router-link>
        </div>
    </section>
</template>

<style scoped>

.label-container:last-child {
    margin: 2em 0 0.5em 0;
}

</style>
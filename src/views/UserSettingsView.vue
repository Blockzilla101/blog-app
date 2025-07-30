<script lang="ts" setup>

import { ref } from "vue";
import type { AccountInfo } from "../api/types.ts";
import { ApiError, Backend } from "../api/backend.ts";
import { applyErrorsToRef } from "../api/util.ts";
import User from "../components/User.vue";

const props = defineProps({
    account: {
        type: Object as () => AccountInfo | null,
        required: true,
    },
});

if (!props.account) {
    window.location.pathname = "/login";
}

// todo implement profile picture upload

const errors = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
    unknownError: "",
});

function clearErrors() {
    errors.value.firstName = "";
    errors.value.lastName = "";
    errors.value.email = "";
    errors.value.password = "";
    errors.value.bio = "";
    errors.value.unknownError = "";
}

async function formSubmit(event: Event) {
    event.preventDefault();

    try {
        await Backend.updateAccount(props.account!);
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
}
</script>

<template>
    <section class="card card-section">
        <div class="settings-container">
            <User :user="account!"></User>
            <form class="form" @submit="formSubmit">
                <div class="input-container">
                    <div class="label-container">
                        <label>First Name</label>
                        <span class="error-text">{{ errors.firstName }}</span>
                    </div>
                    <input v-model="account!.firstName" maxlength="25" minlength="2" placeholder="First name" required
                           type="text" />
                </div>

                <div class="input-container">
                    <div class="label-container">
                        <label>Last Name</label>
                        <span class="error-text">{{ errors.lastName }}</span>
                    </div>
                    <input v-model="account!.lastName" maxlength="25" minlength="2" placeholder="Last name" required
                           type="text" />
                </div>

                <div class="input-container">
                    <div class="label-container">
                        <label>Email</label>
                        <span class="error-text">{{ errors.email }}</span>
                    </div>
                    <input v-model="account!.email" maxlength="100" minlength="1" placeholder="email@provider.com"
                           required
                           type="email" />
                </div>

                <div class="input-container">
                    <div class="label-container">
                        <label>Bio</label>
                        <span class="error-text">{{ errors.bio }}</span>
                    </div>
                    <input v-model="account!.bio" maxlength="50" minlength="1" placeholder="Your bio" required
                           type="text" />
                </div>

                <div class="input-container">
                    <div class="label-container">
                        <label>Profile Picture</label>
                        <!--                        <span class="error-text">{{ errors.bio }}</span>-->
                    </div>
                    <!--                // todo -->
                    <input type="file" />
                </div>

                <!--            <div class="input-container">-->
                <!--                <div class="label-container">-->
                <!--                    <label>Password</label>-->
                <!--                    <span class="error-text">{{ errors.password }}</span>-->
                <!--                </div>-->
                <!--                <input v-model="password" minlength="8" placeholder="Choose a strong password" required-->
                <!--                       type="password" />-->
                <!--            </div>-->

                <div class="label-container">
                    <span class="error-text">{{ errors.unknownError }}</span>
                    <button class="btn" type="submit">Save</button>
                </div>
            </form>
        </div>
    </section>
</template>

<style scoped>

.settings-container {
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
    width: 100%;
}

.card {
    width: 40em;
}

@media (max-width: 768px) {
    .card {
        width: unset;
    }
}

</style>
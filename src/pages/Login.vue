<template>
    <div @submit.prevent="login" class="w-full h-full flex items-center justify-center bg-login bg-cover">
        <div class="w-2/4 alert alert-error mb-3 absolute top-5 left-2/4 -translate-x-2/4" v-if="error">
        <div>
            <p><strong>Hiba történt:</strong> {{ errors[error] || "Ismeretlen hiba." }}</p>
        </div>
        </div>
        <form class="w-full md:w-1/3 flex items-center flex-col bg-base-200 p-16 rounded-xl">
            <h1 class="text-3xl font-bold mb-5">Bejelentkezés</h1>
            <input type="text" v-model="username" name="username" class="input mb-3 w-full" placeholder="Felhasznalonev" required>
            <input type="password" name="password" v-model="password" class="input mb-5 w-full" placeholder="Jelszó" required>
            <input type="submit" :value="processing ? 'Betoltes' : 'Belépés'" :class="`btn btn-primary w-full ${processing ? 'disabled' : ''}`">
        </form>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, getCurrentInstance } from "vue";
import router from "../router";

const username = ref("");
const password = ref("");
const error = ref("");
const processing = ref(false);

const errors: any = {
    INVALID_USERNAME_OR_PASSWORD: "Helytelen felhasználónév vagy jelszó"
};

async function login() {
    processing.value = true;
    try {
        const resp = await axios.post(`http://127.0.0.1:8080/auth/login`, {
            username: username.value,
            password: password.value,
        });

        if (resp.data.session) sessionStorage.setItem("session", resp.data.session);
        router.push("/user/dashboard");
    } catch (err: any) {
        processing.value = false;
        if (!err.response.data) return error.value = err.message;
        error.value = err.response.data.error;
    }
}
</script>
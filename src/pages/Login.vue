<template>
    <div @submit.prevent="login" class="w-full h-full flex items-center justify-center bg-login bg-cover">
        <div class="w-2/4 alert alert-error mb-3 absolute top-5 left-2/4 -translate-x-2/4" v-if="error">
        <div>
            <p><strong>Hiba történt:</strong> {{ errors[error] || "Ismeretlen hiba." }}</p>
        </div>
        </div>
        <form class="w-full md:w-1/3 flex items-center flex-col bg-base-200 p-16 rounded-xl">
            <h1 class="text-3xl font-bold mb-5">Bejelentkezés</h1>
            <input type="email" v-model="email" name="email" class="input mb-3 w-full" placeholder="Email cím" required>
            <input type="password" name="password" v-model="password" class="input mb-5 w-full" placeholder="Jelszó" required>
            <input type="submit" value="Belépés" class="btn btn-primary w-full">
        </form>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, getCurrentInstance } from "vue";
import router from "../router";

const email = ref("");
const password = ref("");
const error = ref("");

const errors: any = {
    INVALID_USER_OR_PASS: "Helytelen felhasználónév vagy jelszó"
};

async function login() {
    try {
        const resp = await axios.post(`http://localhost:8080/auth/login`, {
            username: email.value,
            password: password.value,
        });

        if (resp.data.session) sessionStorage.setItem("session", resp.data.session);
        router.push("/user/dashboard")
    } catch (err: any) {
        console.log(err);
        error.value = err.response.data.error;
        console.log(err.response.data.error);
    }
}
</script>
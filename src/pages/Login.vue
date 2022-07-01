<template>
    <div
        @submit.prevent="login"
        class="w-full h-full flex items-center justify-center bg-login bg-cover"
    >
        <div
            class="w-2/4 alert alert-error mb-3 absolute top-5 left-2/4 -translate-x-2/4"
            v-if="error"
        >
            <div>
                <ExclamationCircleIcon class="w-6 h-6"></ExclamationCircleIcon>
                <p>
                    <strong>Hiba történt:</strong>
                    {{ errors[error] || "Ismeretlen hiba." }}
                </p>
            </div>
            <button class="btn btn-ghost btn-sm btn-circle" @click="error = ''">
                <XIcon class="w-6 h-6"></XIcon>
            </button>
        </div>
        <form
            class="w-full md:w-1/3 flex items-center flex-col bg-base-200 p-16 rounded-xl"
        >
            <h1 class="text-3xl font-bold mb-5">Bejelentkezés</h1>
            <input
                type="text"
                v-model="username"
                name="username"
                class="input mb-3 w-full"
                placeholder="Felhasználónév"
                required
            />
            <input
                type="password"
                name="password"
                v-model="password"
                class="input mb-5 w-full"
                placeholder="Jelszó"
                required
            />
            <input
                type="submit"
                value="Belépés"
                :class="`btn btn-primary w-full mb-3 ${
                    processing ? 'btn-loading' : ''
                }`"
            />
            <router-link class="link self-start" to="/auth/register"
                >Még nincs fiókod? Regisztrálj itt.</router-link
            >
        </form>
    </div>
</template>

<script setup lang="ts">
import axios from "../api";
import { ref } from "vue";
import router from "../router";
import { ExclamationCircleIcon, XIcon } from "@heroicons/vue/outline";

const username = ref("");
const password = ref("");
const error = ref("");
const processing = ref(false);

const errors: any = {
    INVALID_USERNAME_OR_PASSWORD: "Helytelen felhasználónév vagy jelszó",
};

async function login() {
    processing.value = true;
    try {
        const resp = await axios.post("/auth/login", {
            username: username.value,
            password: password.value,
        });

        if (resp.data.error) return (error.value = resp.data.error);

        if (resp.data.session) {
            sessionStorage.setItem("session", resp.data.session);
            (axios.defaults.headers as any)["Authorization"] =
                resp.data.session;

            router.push("/user/dashboard");
        }
    } catch (err: any) {
        console.log(error);
        error.value = err?.message;
    } finally {
        processing.value = false;
    }
}
</script>

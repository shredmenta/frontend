<template>
    <div
        @submit.prevent="register"
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
            <h1 class="text-3xl font-bold mb-5">Regisztráció</h1>
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
                type="text"
                name="invite"
                v-model="invite"
                class="input mb-5 w-full"
                placeholder="Meghívó"
                required
            />
            <input
                type="submit"
                value="Regisztrálás"
                :class="`btn btn-primary w-full mb-3 ${
                    processing ? 'btn-loading' : ''
                }`"
            />
            <router-link to="/auth/login" class="self-start link">
                Már van fiókod? Jelentkezz be itt.
            </router-link>
        </form>
    </div>
</template>

<script setup lang="ts">
import axios from "../api";
import { ref } from "vue";
import router from "../router";
import { XIcon, ExclamationCircleIcon } from "@heroicons/vue/outline";

const username = ref("");
const password = ref("");
const invite = ref("");

const error = ref("");
const processing = ref(false);

const errors: any = {
    USERNAME_TAKEN: "A megadott felhasználónév már foglalt.",
    INVALID_INVITE: "A megadott meghivo nem ervenyes.",
};

async function register() {
    processing.value = true;
    try {
        const resp = await axios.post("/auth/register", {
            username: username.value,
            password: password.value,
            invite: invite.value,
        });
        if (resp.data.err) return (error.value = resp.data.err);

        if (resp.data.session) {
            sessionStorage.setItem("session", resp.data.session);
            (axios.defaults.headers as any)["Authorization"] =
                resp.data.session;

            router.push("/user/dashboard");
        }
    } catch (err: any) {
        error.value = err?.message;
    } finally {
        processing.value = false;
    }
}
</script>

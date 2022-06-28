<template>
    <Loader :loaded="loaded"></Loader>
    <div :class="`px-6 md:p-12 py-6 flex flex-col ${!loaded ? 'hidden' : ''}`">
        <router-link
            to="/user/dashboard"
            class="btn btn-ghost btn-sm mb-3 flex gap-3 self-start"
        >
            <Icon icon="back"></Icon>
            Vissza
        </router-link>
        <div class="flex flex-col md:flex-row gap-3 items-start">
            <ul
                class="bg-base-300 p-3 rounded-3xl flex flex-col md:flex-1 w-full"
            >
                <li
                    v-for="category in categories"
                    :key="category.name"
                    :class="`p-3 ${
                        categories.indexOf(category) == 0 ? 'rounded-t-2xl' : ''
                    } ${
                        categories.indexOf(category) + 1 == categories.length
                            ? 'rounded-b-2xl'
                            : ''
                    } flex flex-row cursor-pointer ${
                        activePage === category.name
                            ? 'bg-base-100'
                            : 'bg-base-200'
                    }`"
                    @click="activePage = category.name"
                >
                    <Icon :icon="category.logo"></Icon>
                    <span class="ml-3">{{ category.friendlyName }}</span>
                </li>
            </ul>
            <div class="bg-base-300 md:flex-[3] rounded-3xl p-8 w-full">
                <div v-if="activePage === 'account'">
                    <h1 class="text-4xl mb-3">Fiók</h1>
                    <div
                        class="p-3 bg-base-200 rounded-xl flex mb-3 flex-col gap-3"
                    >
                        <div class="flex justify-between items-center w-full">
                            <div>
                                <p class="text-sm text-slate-400">
                                    Felhasználónév
                                </p>
                                <p>{{ user.username }}</p>
                            </div>
                            <button class="btn btn-primary">Változtatás</button>
                        </div>
                        <div class="flex justify-between items-center w-full">
                            <div>
                                <p class="text-sm text-slate-400">Csomag</p>
                                <p>{{ user.plan.planType }}</p>
                            </div>
                            <button class="btn btn-primary">Kezelés</button>
                        </div>
                    </div>
                    <div class="flex gap-3 flex-col items-start md:flex-row">
                        <label
                            for="passwordChangeModal"
                            class="btn modal-button btn-primary"
                            >Jelszó változtatás</label
                        >
                        <button class="btn btn-error">Fiók törlése</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <input type="checkbox" id="passwordChangeModal" class="modal-toggle" />
    <Modal id="passwordChangeModal">
        <form @submit.prevent="changePassword">
            <h3 class="font-bold text-lg mb-3">Jelszó változtatás</h3>
            <div class="alert alert-error mb-3" v-if="error">
                <div>
                    <Icon icon="exclamation-circle"></Icon>
                    {{ error }}
                </div>
            </div>
            <input
                type="password"
                class="input input-bordered w-full mb-3"
                placeholder="Régi jelszó"
                v-model="oldPassword"
                required
            />
            <input
                type="password"
                class="input input-bordered w-full mb-3"
                placeholder="Új jelszó"
                v-model="newPassword"
                required
            />
            <input
                type="password"
                class="input input-bordered w-full"
                placeholder="Új jelszó megerősítése"
                v-model="newPasswordAgain"
                required
            />
            <div class="modal-action">
                <label for="passwordChangeModal" class="btn">Vissza</label>
                <input
                    value="Mentés"
                    type="submit"
                    :class="`btn btn-primary ${
                        passwordLoading ? 'loading' : ''
                    }`"
                />
            </div>
        </form>
    </Modal>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import Loader from "@/components/Loader.vue";
import Modal from "@/components/Modal.vue";

import { onBeforeMount, ref } from "vue";
import axios, { AxiosResponse } from "axios";
import router from "../router";

const session = sessionStorage.getItem("session");
if (!session) router.push("/auth/login");

const categories = [
    {
        name: "account",
        friendlyName: "Fiók",
        logo: "user",
    },
    {
        name: "billing",
        friendlyName: "Számlázás",
        logo: "credit-card",
    },
    {
        name: "invites",
        friendlyName: "Meghívók",
        logo: "plus-circle",
    },
];

const activePage = ref("account");
const loaded = ref(false);

const oldPassword = ref("");
const newPassword = ref("");
const newPasswordAgain = ref("");

const passwordLoading = ref(false);
const error = ref<any>(null);

const user = ref({
    plan: {
        planType: "...",
        limits: {
            submitsPerDay: 0,
            submitsPerMonth: 0,
            maxSubmits: 0,
        },
    },
    planExpires: 0,
    username: "...",
    usage: {
        month: 0,
        day: 0,
        lastSpam: 0,
    },
});

async function changePassword() {
    passwordLoading.value = true;

    if (newPassword.value != newPasswordAgain.value)
        return (error.value = "A jelszavak nem egyeznek");

    await axios
        .patch(`${import.meta.env.VITE_API_URL}/user/@me/password`, {
            password: newPassword.value,
        })
        .catch((err) => {
            error.value = err.response.data.error;
        });
}

async function loadUser() {
    user.value = (
        (await axios
            .get(`${import.meta.env.VITE_API_URL}/user/@me`, {
                headers: {
                    Authorization: session || "",
                },
            })
            .catch((err) => {
                if (!err.response.data) return;
                if (
                    err.response.data.error === "UNAUTHORIZED" ||
                    err.response.data.error === "INVALID_SESSION"
                ) {
                    router.push("/auth/login");
                }
            })) as AxiosResponse
    ).data;
}

onBeforeMount(async () => {
    await loadUser();
    loaded.value = true;
});
</script>

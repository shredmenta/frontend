<template>
    <Loader :loaded="loaded"></Loader>
    <div :class="`px-6 md:p-12 py-6 flex flex-col ${!loaded ? 'hidden' : ''}`">
        <div class="flex justify-between">
            <h1 class="mb-5 text-3xl font-bold">Üdv, {{ user.username }}!</h1>
            <router-link
                to="/user/settings"
                class="btn btn-sm btn-ghost btn-square"
            >
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                </svg>
            </router-link>
        </div>
        <Stats :user="user"></Stats>
        <div class="flex gap-3 items-start flex-col sm:flex-row">
            <Spam
                @new-job="reload"
                :max-amount="user.plan.limits.maxSubmits"
            ></Spam>
            <Jobs ref="jobsComponent"></Jobs>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios, { AxiosResponse } from "axios";
import { onBeforeMount, ref } from "vue";
import router from "../router";
import Spam from "@/components/Spam.vue";
import Jobs from "@/components/Jobs.vue";
import Loader from "@/components/Loader.vue";
import Stats from "@/components/Stats.vue";

const session = sessionStorage.getItem("session");
if (!session) router.push("/auth/login");

const loaded = ref(false);
const jobsComponent = ref(null) as any;

async function reload() {
    jobsComponent.value.refreshJobs();
    await loadUser();
}

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

<script lang="ts"></script>

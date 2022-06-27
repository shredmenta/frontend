<template>
    <div
        :class="`w-screen h-screen bg-base-300 ${
            loaded ? 'hidden' : ''
        } flex items-center justify-center`"
    >
        <svg
            class="animate-spin h-12 w-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            ></circle>
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    </div>
    <div :class="`px-6 md:p-12 py-6 flex flex-col ${!loaded ? 'hidden' : ''}`">
        <h1 class="mb-5 text-3xl font-bold">Üdv, {{ user.username }}!</h1>
        <div class="stats bg-base-300 shadow mb-3 shadow-xl flex">
            <div class="stat">
                <div class="stat-title">Fiók típusa</div>
                <div class="stat-value">
                    {{ plans[user.plan.planType] || user.plan.planType }}
                </div>
            </div>
            <div class="stat">
                <div class="stat-title">Lejár</div>
                <div class="stat-value">
                    {{
                        user.planExpires === 0
                            ? "N/A"
                            : new Date(user.planExpires).toLocaleDateString()
                    }}
                </div>
            </div>
        </div>
        <div class="flex gap-3 items-start flex-col sm:flex-row">
            <Spam @new-job="" :max-amount="500"></Spam>
            <Jobs ref="jobs"></Jobs>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios, { AxiosResponse } from "axios";
import { onBeforeMount, ref } from "vue";
import router from "../router";
import Spam from "../components/Spam.vue";
import Jobs from "../components/Jobs.vue";

const session = sessionStorage.getItem("session");
if (!session) router.push("/auth/login");

const loaded = ref(false);
const jobs = ref(null);

const plans: any = {
    Free: "Ingyenes",
    Premium: "Premium",
};

const user = ref({
    plan: {
        planType: "...",
    },
    planExpires: 0,
    username: "...",
});

function refreshJobs() {
    console.log(jobs);
}

onBeforeMount(async () => {
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

    loaded.value = true;
});
</script>
/

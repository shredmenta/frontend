<template>
    <div class="mx-12 my-6 flex flex-col">
        <h1 class="mb-5 text-3xl font-bold">Üdv, {{ user.username }}!</h1>
        <div class="stats bg-base-300 shadow mb-3 shadow-xl">
            <div class="stat">
                <div class="stat-title">Fiók típusa</div>
                <div class="stat-value">{{ plans[user.plan.planType] || user.plan.planType }}</div>
            </div>
            <div class="stat">
                <div class="stat-title">Lejár</div>
                <div class="stat-value">{{
                    user.plan.expires === 0 ? "N/A" : new Date(user.plan.expires).toLocaleDateString()
                }}</div>
            </div>
        </div>
        <div class="flex gap-3 items-start">
            <Spam :max-amount="50"></Spam>
            <Jobs :jobs="jobs"></Jobs>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios, { Axios, AxiosResponse } from "axios";
import { onBeforeMount, onMounted, ref } from "vue";
import router from "../router";
import Spam from "../components/Spam.vue";
import Jobs from "../components/Jobs.vue";

const session = sessionStorage.getItem("session");
if (!session) router.push("/auth/login");

const plans: any = {
    "Free": "Ingyenes",
    "Premium": "Premium"
};

const user = ref({
    plan: {
        planType: "...",
        expires: 0,
    },
    username: "...",
});

const jobs = ref([
    {
        status: "",
        id: 0,
        amount: 0,
        createdBy: "",
        jobId: -1,
    }
]);

onBeforeMount(async () => {
    const userResp = await axios.get(`${import.meta.env.VITE_API_URL}/user/@me`, {
        headers: {
            "Authorization": session || "",
        },
    }).catch(err => {
        if (!err.response.data) return;
        if (err.response.data.error === "UNAUTHORIZED" ||
        err.response.data.error === "INVALID_SESSION") {
            router.push("/auth/login");
        }
    }) as AxiosResponse;

    const jobsResp = await axios.get(`${import.meta.env.VITE_API_URL}/redmenta/jobs`, {
        headers: {
            "Authorization": session || "",
        },
    }).catch(err => {
        if (!err.response.data) return;
        if (err.response.data.error === "UNAUTHORIZED" ||
        err.response.data.error === "INVALID_SESSION") {
            router.push("/auth/login");
        }
    }) as AxiosResponse;

    console.log(jobsResp);
    
    user.value = userResp.data;
    jobs.value = jobsResp.data;
});
</script>
<template>
    <div class="bg-base-300 p-6 flex-1 rounded-3xl shadow-xl">
        <div class="flex mb-5">
            <h1 class="text-3xl font-extrabold flex-1">Spamek</h1>
            <button class="btn btn-ghost btn-square btn-sm" @click="loadJobs">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            </button>
        </div>
        <div class="alert alert-info" v-if="jobs.length === 0">
            <div>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Még nem indítottál spamet.
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <div v-for="job in jobs" :key="job.jobId" class="bg-base-200 p-3 rounded-lg flex">
                <p v-if="job.status === 'finished'" class="text-success flex mr-3">
                    <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Kesz
                </p>
                <p v-if="job.status === 'error'" class="text-error flex mr-3">
                    <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Sikertelen
                </p>
                <p v-if="job.status === 'running'" class="text-primary flex mr-3">
                    <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Folyamatban
                </p>
                <p class="flex-1">ID: {{ job.id }} | Mennyiség: {{ job.amount }}</p>
                <p class="text-stone-500">{{ new Date(job.createdAt).toLocaleDateString() }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import axios, { AxiosResponse } from "axios";
import router from "../router";

const session = sessionStorage.getItem("session");

type Job = {
    status: string,
    id: number,
    amount: number,
    createdBy: string,
    jobId: number,
    createdAt: 0,
};

const jobs = ref<Job[]>([]);

async function loadJobs() {
        const resp = await axios.get(`${import.meta.env.VITE_API_URL}/redmenta/jobs`, {
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
    
    jobs.value = resp.data;
}

onBeforeMount(async () => {
    await loadJobs();
});
</script>
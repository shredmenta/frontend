<template>
    <div class="bg-base-300 p-6 flex-1 rounded-3xl shadow-xl w-full">
        <div class="flex mb-5">
            <h1 class="text-3xl font-extrabold flex-1">Spamek</h1>
            <button
                class="btn btn-ghost btn-square btn-sm"
                @click="refreshJobs"
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                </svg>
            </button>
        </div>
        <div class="alert alert-info" v-if="jobs.length === 0">
            <div>
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                Még nem indítottál spamet.
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <Job
                v-for="job in jobs.slice(page * 10 - 10, page * 10)"
                :key="job.jobId"
                :job="job"
            ></Job>
            <div class="btn-group self-center" v-if="jobs.length > 10">
                <button
                    v-for="i in Math.ceil(jobs.length / 10)"
                    :class="`btn ${i == page ? 'btn-active' : ''}`"
                    @click="page = i"
                >
                    {{ i }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Job from "./Job.vue";
import router from "../router";
import axios from "../api";
import { onBeforeMount, ref } from "vue";

const session = sessionStorage.getItem("session");
if (!session) router.push("/auth/login");

const page = ref(1);

type Job = {
    status: string;
    id: number;
    amount: number;
    createdBy: string;
    jobId: number;
    createdAt: 0;
};

let jobs = ref<Job[]>([]);

async function loadJobs() {
    const resp = await axios.get("/redmenta/jobs");
    jobs.value = resp.data;
    console.log(jobs.value);
}

async function refreshJobs() {
    await loadJobs();
}

onBeforeMount(async () => {
    await loadJobs();
    console.log(jobs.value.length / 10);
});

defineExpose({ refreshJobs });
</script>

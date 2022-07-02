<template>
    <div class="bg-base-300 p-6 flex-1 rounded-3xl shadow-xl w-full">
        <div class="flex mb-5">
            <h1 class="text-3xl font-extrabold flex-1">Spamek</h1>
            <button
                class="btn btn-ghost btn-square btn-sm"
                @click="refreshJobs"
            >
                <RefreshIcon></RefreshIcon>
            </button>
        </div>
        <div class="alert alert-info" v-if="jobs.length === 0">
            <div>
                <InformationCircleIcon class="w-6 h-6"></InformationCircleIcon>
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
import { RefreshIcon, InformationCircleIcon } from "@heroicons/vue/outline";

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

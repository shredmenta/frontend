<template>
    <div class="bg-base-300 p-6 flex-1 rounded-xl shadow-xl">
        <h1 class="text-3xl font-extrabold mb-5">Spamek</h1>
        <div class="alert alert-info" v-if="jobs.length === 0">
            <div>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Meg nem inditottál spamet.
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <div v-for="job in jobs" :key="job" class="bg-base-200 p-3 rounded-lg flex">
                <svg v-if="job.status === 'finished'" class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <svg v-if="jobs.status === 'running'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p class="flex-1">ID: {{ job.id }}</p>
                <p class="text-stone-500">{{ new Date(job.createdAt).toLocaleDateString() }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
    jobs: {
        type: Array,
        required: true,
    } as any
});
</script>
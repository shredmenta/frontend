<template>
    <div class="bg-base-200 p-3 rounded-lg flex">
        <p v-if="job.status === 'finished'" class="text-success flex mr-3">
            <svg
                class="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                ></path>
            </svg>
            Kész
        </p>
        <p v-if="job.status === 'error'" class="text-error flex mr-3">
            <svg
                class="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
            Sikertelen
        </p>
        <p v-if="job.status === 'running'" class="text-primary flex mr-3">
            <svg
                class="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
            Folyamatban
        </p>
        <p class="flex-1">ID: {{ job.id }} | Mennyiség: {{ job.amount }}</p>
        <p class="text-stone-500">
            {{ new Date(job.createdAt).toLocaleDateString() }}
        </p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(["job"]);
</script>

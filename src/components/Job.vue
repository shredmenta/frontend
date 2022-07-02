<template>
    <div class="bg-base-200 p-3 rounded-lg flex">
        <p v-if="job.status === 'finished'" class="text-success flex mr-3">
            <CheckIcon class="h-6 w-6 mr-3"></CheckIcon>
            Kész
        </p>
        <p v-if="job.status === 'error'" class="text-error flex mr-3">
            <XIcon class="w-6 h-6 mr-3"></XIcon>
            Sikertelen
        </p>
        <p v-if="job.status === 'running'" class="text-primary flex mr-3">
            <DotsCircleHorizontalIcon
                class="w-6 h-6 mr-3"
            ></DotsCircleHorizontalIcon>
            Folyamatban
        </p>
        <p class="flex-1">ID: {{ job.id }} | Mennyiség: {{ job.amount }}</p>
        <p class="text-stone-500">
            {{ new Date(job.createdAt).toLocaleDateString() }}
        </p>
    </div>
</template>

<script setup lang="ts">
import {
    CheckIcon,
    DotsCircleHorizontalIcon,
    XIcon,
} from "@heroicons/vue/outline";

defineProps(["job"]);
</script>

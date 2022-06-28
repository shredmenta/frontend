<template>
    <div
        :class="`w-screen h-screen bg-base-300 ${
            loaded ? 'hidden' : ''
        } flex items-center justify-center`"
    >
        <Spinner class="h-12 w-12 text-white"></Spinner>
    </div>
</template>

<script setup lang="ts">
import Spinner from "@/components/Spinner.vue";
defineProps<{ loaded: boolean }>();
</script>

<template>
    <form @submit.prevent="spam" class="bg-base-300 p-6 shadow-xl rounded-3xl flex flex-col flex-1">
        <h1 class="mb-5 weight-600 font-extrabold text-3xl">Spam indítása</h1>
        <input type="number" class="input input-bordered mb-3" placeholder="Mennyiség" :max="props.maxAmount" v-bind="amount">
        <input type="text" class="input input-bordered" placeholder="Direktcím">
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
    maxAmount: {
        type: Number,
        required: true,
    }
});

const amount = ref(0);

async function spam(): Promise<void> {
    console.log(amount);
}
</script>
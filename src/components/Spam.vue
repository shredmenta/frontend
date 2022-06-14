<template>
    <form @submit.prevent="spam" class="bg-base-300 p-6 shadow-xl rounded-3xl flex flex-col flex-1">
        <h1 class="mb-5 weight-600 font-extrabold text-3xl">Spam indítása</h1>
        <input type="text" class="input input-bordered mb-3" placeholder="Direktcím" v-model="direktcim">
        <input type="number" class="input input-bordered mb-3" placeholder="Mennyiség" :max="props.maxAmount" v-model="amount">
        <input type="submit" class="btn btn-success" value="Mehet!">
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios, { AxiosResponse } from "axios";
import router from "../router";

const props = defineProps({
    maxAmount: {
        type: Number,
        required: true,
    }
});

const session = sessionStorage.getItem("session") || "";

const amount = ref(null);
const direktcim = ref(null);

async function spam(): Promise<void> {
    // 931447506
    const resp = await axios.post(`${import.meta.env.VITE_API_URL}/redmenta/spam`, {
        direktcim: direktcim.value,
        amount: amount.value,
        firstName: "xd",
        lastName: "xd",
    }, {
        headers: {
            "Authorization": session,
        }
    }).catch(err => {
        if (!err.response.data) return;
        if (err.response.data.error === "UNAUTHORIZED" ||
        err.response.data.error === "INVALID_SESSION") {
            router.push("/auth/login");
        }
    }) as AxiosResponse;
}
</script>
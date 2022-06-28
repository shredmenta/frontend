<template>
    <form
        @submit.prevent="spam"
        class="bg-base-300 p-6 shadow-xl rounded-3xl flex flex-col flex-1 w-full"
    >
        <h1 class="mb-5 weight-600 font-extrabold text-3xl">Spam indítása</h1>
        <div class="alert alert-error mb-3" v-if="error">
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
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                {{ errors[error] || `Ismeretlen hiba: ${error}` }}
            </div>
            <button
                class="btn btn-sm btn-ghost btn-circle"
                @click.prevent="error = null"
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
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
        </div>
        <div class="form-control">
            <label class="label cursor-pointer mb-3 flex justify-start gap-3">
                <input
                    type="checkbox"
                    class="toggle toggle-primary"
                    checked
                    v-model="useDirektcim"
                />
                <span class="label-text">Direktcím használata</span>
            </label>
        </div>
        <input
            v-if="useDirektcim"
            class="input input-bordered mb-3"
            placeholder="Direktcím"
            v-model="direktcim"
            required
            type="text"
        />
        <input
            v-if="!useDirektcim"
            class="input input-bordered mb-3"
            placeholder="ID"
            v-model="id"
            required
            type="number"
        />
        <input
            type="number"
            class="input input-bordered mb-3"
            :placeholder="
                maxAmount != -1 ? `Mennyiség (max: ${maxAmount})` : `Mennyiség`
            "
            :max="maxAmount != -1 ? maxAmount : ''"
            min="1"
            v-model="amount"
            required
        />
        <button :class="`btn btn-success ${isLoading ? 'disabled' : ''}`">
            <Spinner v-if="isLoading" class="h-6 w-6"></Spinner>
            {{ isLoading ? "" : "Mehet!" }}
        </button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios, { AxiosResponse } from "axios";
import router from "../router";
import Spinner from "@/components/Spinner.vue";

const props = defineProps({
    maxAmount: {
        type: Number,
        required: true,
    },
});

const emits = defineEmits(["newJob"]);

const session = sessionStorage.getItem("session") || "";

const amount = ref(null);
const direktcim = ref(null);
const id = ref(null);
const isLoading = ref(false);
const error = ref(null);
const useDirektcim = ref(true);

// áéíúüűöőóÁÉÚÜŰÖŐÍ
const errors = {
    INVALID_DIREKTCIM: "Érvénytelen direktcím.",
    MISSING_PARAMS: "Hiányzó paraméterek.",
    PRIVATE_WORKSHEET: "A feladatlap nem publikus.",
};

async function spam(): Promise<void> {
    isLoading.value = true;
    // 931447506
    const resp = (await axios
        .post(
            `${import.meta.env.VITE_API_URL}/redmenta/spam`,
            useDirektcim.value
                ? {
                      direktcim: direktcim.value,
                      amount: amount.value,
                  }
                : {
                      id: id.value,
                      amount: amount.value,
                  },
            {
                headers: {
                    Authorization: session,
                },
            }
        )
        .catch((err) => {
            isLoading.value = false;
            if (!err.response.data) return;
            if (
                err.response.data.error === "UNAUTHORIZED" ||
                err.response.data.error === "INVALID_SESSION"
            ) {
                router.push("/auth/login");
            }

            error.value = err.response.data.error;
        })) as AxiosResponse;

    isLoading.value = false;

    if (error.value) return;

    emits("newJob", resp.data);
}
</script>

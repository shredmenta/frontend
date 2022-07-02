<template>
    <form
        @submit.prevent="spam"
        class="bg-base-300 p-6 shadow-xl rounded-3xl flex flex-col flex-1 w-full"
    >
        <h1 class="mb-5 weight-600 font-extrabold text-3xl">Spam indítása</h1>
        <div class="alert alert-error mb-3" v-if="error">
            <div>
                <ExclamationCircleIcon class="w-6 h-6"></ExclamationCircleIcon>
                {{ errors[error] || `Ismeretlen hiba: ${error}` }}
            </div>
            <button
                class="btn btn-sm btn-ghost btn-circle"
                @click.prevent="error = null"
            >
                <XIcon class="w-6 h-6"></XIcon>
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
        <button :class="`btn btn-success ${isLoading ? 'loading' : ''}`">
            Mehet!
        </button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "../api";
import { ExclamationCircleIcon, XIcon } from "@heroicons/vue/outline";

defineProps({
    maxAmount: {
        type: Number,
        required: true,
    },
});

const emits = defineEmits(["newJob"]);

const amount = ref(null);
const direktcim = ref(null);
const id = ref(null);
const isLoading = ref(false);
const error = ref<any>(null);
const useDirektcim = ref(true);

// áéíúüűöőóÁÉÚÜŰÖŐÍ
const errors: any = {
    INVALID_DIREKTCIM: "Érvénytelen direktcím.",
    MISSING_PARAMS: "Hiányzó paraméterek.",
    PRIVATE_WORKSHEET: "A feladatlap nem publikus.",
};

async function spam(): Promise<void> {
    isLoading.value = true;
    error.value = null;
    const payload = useDirektcim.value
        ? {
              direktcim: direktcim.value,
              amount: amount.value,
          }
        : {
              id: id.value,
              amount: amount.value,
          };

    const resp = await axios.post("/redmenta/spam", payload);

    if (resp.data.error) {
        error.value = resp.data.error;
    }
    isLoading.value = false;

    emits("newJob", resp.data);
}
</script>

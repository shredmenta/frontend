<template>
    <h1 class="text-4xl mb-3">Fiók</h1>
    <div class="p-3 bg-base-200 rounded-xl flex mb-3 flex-col gap-3">
        <div class="flex justify-between items-center w-full">
            <div>
                <p class="text-sm text-slate-400">Felhasználónév</p>
                <p
                    :class="
                        !loaded
                            ? 'bg-gray-500 text-transparent rounded-md animate-pulse'
                            : ''
                    "
                >
                    {{ user.username }}
                </p>
            </div>
            <button class="btn btn-primary">Változtatás</button>
        </div>
        <div class="flex justify-between items-center w-full">
            <div>
                <p class="text-sm text-slate-400">Csomag</p>
                <p
                    :class="
                        !loaded
                            ? 'bg-gray-500 text-transparent rounded-md animate-pulse'
                            : ''
                    "
                >
                    {{ user.plan.planType }}
                </p>
            </div>
            <button class="btn btn-primary">Kezelés</button>
        </div>
    </div>
    <div class="flex gap-3 flex-col items-start md:flex-row">
        <label for="passwordChangeModal" class="btn modal-button btn-primary"
            >Jelszó változtatás</label
        >
        <button class="btn btn-error">Fiók törlése</button>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import axios from "../../api";

const loaded = ref(false);

const user = ref({
    plan: {
        planType: "...",
        limits: {
            submitsPerDay: 0,
            submitsPerMonth: 0,
            maxSubmits: 0,
        },
    },
    planExpires: 0,
    username: "...",
    usage: {
        month: 0,
        day: 0,
        lastSpam: 0,
    },
});

async function loadUser() {
    const resp = await axios.get("/user/@me");
    user.value = resp.data;
}

onBeforeMount(async () => {
    await loadUser();
    loaded.value = true;
});
</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-4xl mb-3">Meghívók</h1>
        <button class="btn btn-primary btn-ghost btn-sm" @click="newInvite">
            <PlusIcon class="w-6 h-6 mr-3"></PlusIcon>
            Új meghívó
        </button>
    </div>
    <div class="flex flex-col gap-3">
        <Spinner class="w-12 h-12 self-center my-6" v-if="!loaded"></Spinner>
        <div
            class="p-3 bg-base-200 rounded-xl flex items-center justify-between"
            v-for="invite in invites"
        >
            <span class="font-mono">
                {{ invite.code }}
            </span>
            <button
                class="btn-sm btn-circle btn-ghost text-error"
                aria-label="Törlés"
            >
                <XIcon></XIcon>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlusIcon, XIcon } from "@heroicons/vue/outline";
import { onBeforeMount, ref } from "vue";
import axios from "../../api";
import Spinner from "@/components/Spinner.vue";

const invites = ref<any[]>([]);
const loaded = ref(false);

async function loadInvites() {
    const resp = await axios.get("/user/invites");
    invites.value = resp.data.invites;
}

async function newInvite() {
    const resp = await axios.post("/user/invites");
    invites.value.push(resp.data);
}

onBeforeMount(async () => {
    await loadInvites();
    loaded.value = true;
});
</script>

<template>
    <Loader :loaded="loaded"></Loader>
    <div :class="`px-6 md:p-12 py-6 flex flex-col ${!loaded ? 'hidden' : ''}`">
        <div class="flex justify-between">
            <h1 class="mb-5 text-3xl font-bold">Üdv, {{ user.username }}!</h1>
            <div class="flex gap-3">
                <router-link to="/user/settings" class="btn btn-sm btn-ghost">
                    <CogIcon class="w-6 h-6 mr-2"></CogIcon>
                    Beallitasok
                </router-link>
                <button class="btn btn-sm btn-ghost" @click="logout">
                    <LogoutIcon class="w-6 h-6 mr-2"></LogoutIcon>
                    Kijelentkezes
                </button>
            </div>
        </div>
        <Stats :user="user"></Stats>
        <div class="flex gap-3 items-start flex-col sm:flex-row">
            <Spam
                @new-job="reload"
                :max-amount="user.plan.limits.maxSubmits"
            ></Spam>
            <Jobs ref="jobsComponent"></Jobs>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "../api";
import { onBeforeMount, ref } from "vue";
import router from "../router";
import Spam from "@/components/Spam.vue";
import Jobs from "@/components/Jobs.vue";
import Loader from "@/components/Loader.vue";
import Stats from "@/components/Stats.vue";
// import Icon from "@/components/Icon.vue";
import { LogoutIcon, CogIcon } from "@heroicons/vue/outline";

const session = sessionStorage.getItem("session");
if (!session) router.push("/auth/login");

const loaded = ref(false);
const jobsComponent = ref(null) as any;

async function reload() {
    jobsComponent.value.refreshJobs();
}

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
    user.value = (await axios.get("/user/@me")).data;
}
async function logout() {
    sessionStorage.clear();
    router.push("/");
}

onBeforeMount(async () => {
    await loadUser();
    loaded.value = true;
});
</script>

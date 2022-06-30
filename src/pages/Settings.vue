<template>
    <div :class="`px-6 md:p-12 py-6 flex flex-col`">
        <router-link
            to="/user/dashboard"
            class="btn btn-ghost btn-sm mb-3 flex gap-3 self-start"
        >
            <Icon icon="back"></Icon>
            Vissza
        </router-link>
        <div class="flex flex-col md:flex-row gap-3 items-start">
            <div
                class="bg-base-300 p-3 rounded-3xl flex flex-col md:flex-1 w-full"
            >
                <button
                    v-for="category in categories"
                    :key="category.name"
                    :class="`p-3 ${
                        categories.indexOf(category) == 0 ? 'rounded-t-2xl' : ''
                    } ${
                        categories.indexOf(category) + 1 == categories.length
                            ? 'rounded-b-2xl'
                            : ''
                    } flex flex-row cursor-pointer ${
                        '' === category.name ? 'bg-base-100' : 'bg-base-200'
                    }`"
                    @click="router.push({ name: category.name })"
                >
                    <component
                        :is="category.logo"
                        class="w-6 h-6 mr-3"
                    ></component>
                    {{ category.friendlyName }}
                </button>
            </div>
            <div class="bg-base-300 md:flex-[3] rounded-3xl p-8 w-full">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <input type="checkbox" id="passwordChangeModal" class="modal-toggle" />
    <Modal id="passwordChangeModal">
        <form @submit.prevent="changePassword">
            <h3 class="font-bold text-lg mb-3">Jelszó változtatás</h3>
            <div class="alert alert-error mb-3" v-if="error">
                <div>
                    <Icon icon="exclamation-circle"></Icon>
                    {{ error }}
                </div>
            </div>
            <input
                type="password"
                class="input input-bordered w-full mb-3"
                placeholder="Régi jelszó"
                v-model="oldPassword"
                required
            />
            <input
                type="password"
                class="input input-bordered w-full mb-3"
                placeholder="Új jelszó"
                v-model="newPassword"
                required
            />
            <input
                type="password"
                class="input input-bordered w-full"
                placeholder="Új jelszó megerősítése"
                v-model="newPasswordAgain"
                required
            />
            <div class="modal-action">
                <label for="passwordChangeModal" class="btn">Vissza</label>
                <input
                    value="Mentés"
                    type="submit"
                    :class="`btn btn-primary ${
                        passwordLoading ? 'loading' : ''
                    }`"
                />
            </div>
        </form>
    </Modal>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import {
    UserIcon,
    CreditCardIcon,
    PlusCircleIcon,
} from "@heroicons/vue/outline";

import Loader from "@/components/Loader.vue";
import Modal from "@/components/Modal.vue";

import { ref } from "vue";
import axios from "../api";
import router from "../router";

const session = sessionStorage.getItem("session");
if (!session) router.push("/auth/login");

const categories = [
    {
        name: "account",
        friendlyName: "Fiók",
        logo: UserIcon,
    },
    {
        name: "billing",
        friendlyName: "Számlázás",
        logo: CreditCardIcon,
    },
    {
        name: "invites",
        friendlyName: "Meghívók",
        logo: PlusCircleIcon,
    },
];

const oldPassword = ref("");
const newPassword = ref("");
const newPasswordAgain = ref("");

const passwordLoading = ref(false);
const error = ref<any>(null);

async function changePassword() {
    passwordLoading.value = true;

    if (newPassword.value != newPasswordAgain.value)
        return (error.value = "A jelszavak nem egyeznek");

    await axios
        .patch("/user/@me/password", {
            password: newPassword.value,
        })
        .catch((err) => {
            error.value = err.response.data.error;
        });
}
</script>

import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";

// pages
import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Settings from "@/pages/Settings.vue";
import Register from "@/pages/Register.vue";

import AccountSettings from "@/pages/settings/AccountSettings.vue";
import InviteSettings from "@/pages/settings/InviteSettings.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/auth/login",
        component: Login,
        name: "login",
    },
    {
        path: "/user/dashboard",
        component: Dashboard,
        name: "dashboard",
    },
    {
        path: "/user/settings",
        component: Settings,
        name: "settings",
        children: [
            {
                component: AccountSettings,
                name: "account",
                path: "/user/settings/account",
                alias: "",
            },
            {
                component: InviteSettings,
                name: "invites",
                path: "/user/settings/invites",
            },
        ],
    },
    {
        path: "/auth/register",
        component: Register,
        name: "register",
    },
    {
        path: "/",
        redirect: () => {
            const session = sessionStorage.getItem("session");

            if (!session) return { path: "/auth/login" };
            return { path: "/user/dashboard" };
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

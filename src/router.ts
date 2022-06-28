import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";

// pages
import Login from "./pages/Login.vue";
import Dashboard from "./pages/Dashboard.vue";
import Settings from "./pages/Settings.vue";

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

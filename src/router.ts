import { createWebHistory, createRouter } from "vue-router";

// pages
import Login from "./pages/Login.vue";
import Spam from "./pages/Spam.vue";
import Dashboard from "./pages/Dashboard.vue";

const routes = [
    {
        path: "/auth/login",
        component: Login,
        name: "login",
    },
    {
        path: "/redmenta/spam",
        component: Spam,
        name: "spam",
    },
    {
        path: "/user/dashboard",
        component: Dashboard,
        name: "dashboard",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
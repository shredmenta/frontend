import { createWebHistory, createRouter } from "vue-router";

// pages
import Login from "./pages/Login.vue";
import Dashboard from "./pages/Dashboard.vue";

const routes = [
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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
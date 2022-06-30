import { Axios } from "axios";
import router from "./router";

const axios = new Axios({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: sessionStorage.getItem("session") || "",
    },
    validateStatus: (status) => {
        return status >= 200 && status < 500;
    },
});

axios.interceptors.response.use(async (resp) => {
    resp.data = JSON.parse(resp.data) || resp.data;

    if (
        (resp.data.error && resp.data.error === "UNAUTHORIZED") ||
        resp.data.error === "INVALID_SESSION"
    ) {
        router.push("/auth/login");
    }
    return resp;
});

export default axios;

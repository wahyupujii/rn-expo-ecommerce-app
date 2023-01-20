import axios from "../../config/axios";

export default {
    login: (credentials) => axios.post("/users/login", credentials),
    register: (payload) => axios.post("/users/register", payload),
    refresh: (payload) => axios.post("/users/refresh-token", {
        token: payload.refreshToken,
        email: payload.email
    })
}
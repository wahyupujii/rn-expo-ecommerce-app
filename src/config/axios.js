import axios from "axios";
import errorHandler from "./errorHandler"

const instance = axios.create({
    baseURL: "http://192.168.1.8:3000",
})

instance.interceptors.response.use(
    response => {
        return response.data
    },
    async err => {
        return errorHandler(err)
    }
)

export default instance
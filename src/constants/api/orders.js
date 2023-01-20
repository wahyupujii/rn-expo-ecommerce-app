import axios from "../../config/axios"

export default {
    create: (data = {}) => axios.post("/orders", data),
    getOrderReady: () => axios.get("/orders/get-order-verify-null")
}
import axios from "../../config/axios";

export default {
    getAll: () => axios.get("/products"),
    getDetail: (id) => axios.get(`/products/${id}`)
}
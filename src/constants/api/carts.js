import axios from "../../config/axios";

export default {
    getCart: (orderID) => axios.get(`/cart/user-cart/${orderID}`),
    addCart: (payload) => axios.post('/cart/user-cart', payload),
    changeCount: (url, data) => axios.post(url, data),
    deleteProduct: (payload) => axios.delete('/cart/user-cart', payload)
}
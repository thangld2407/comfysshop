import { axiosClient } from "./axiosClient";
export const Api = {
    getAllProduct() {
        const url = '/';
        return axiosClient.get(url);
    },
    getProductByCategoryId() {
        const url = '/product/:categoryId';
        return axiosClient.get(url)
    },
    searchOneProduct(search) {
        const url = `/product/search?name=${search}`;
        return axiosClient.get(url);
    },
}
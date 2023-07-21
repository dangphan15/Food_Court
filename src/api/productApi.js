import adminAxios from "./AxiosAdmin";

export const productApi = {

    getAllProducts: () => {
        return  adminAxios.get(
            `/Product/GetHistoryProduct?pageIndex=0&pageSize=1000`
        );
    },

    getProductById: (productId) => {
        return adminAxios.get(`/Product/GetProductById/${productId}`);
    },

    getProductByName: (productName) => {
        return adminAxios.get(`/Product/GetProductsByName/${productName}?pageIndex=0&pageSize=1000`);
    },

    getProductByCateId: (shopCategoryId) => {
        return adminAxios.get(`/Product/GetHistoryProductsByShopCategoryId/${shopCategoryId}?pageIndex=0&pageSize=1000`);
    },

    addProduct: async (product) => {
        try {
            const res = await adminAxios.post(`/Product/CreateProduct`, product);
            return res;
        } catch (err) {
            throw err;
        }
    },

    updateProduct: async (productId, product) => {
        try {
            console.log(productId, product);
            const res = await adminAxios.put(`/Product/UpdateProduct/${productId}`, product);
            console.log(res);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    deleteProduct: async (productId) => {
        try {
            console.log(productId);
            const res = await adminAxios.delete(`/Product/DeleteProduct/${productId}`);
            return res;
        } catch (error) {
            console.log(error)
        }
    },

};

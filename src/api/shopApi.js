import adminAxios from "./AxiosAdmin";

export const shopApi = {
    getAllShops: () => {
        return  adminAxios.get(
            `/Shop/GetHistoryShop?pageIndex=0&pageSize=1000`
        );
    },

    getAllShopsPagination: (index, size) => {
        return adminAxios.get(`/Shop/GetAllShops?pageIndex=${index}&pageSize=${size}`);
    },

    getAllShopCate: () => {
        return adminAxios.get("/ShopCategory/GetHistoryShopCategory?pageIndex=0&pageSize=1000");
    },

    getShopById: (shopId) => {
        return adminAxios.get(`/Shop/GetShopByShopId/${shopId}`);
    },

    getShopByUserId: (userId) => {
        return adminAxios.get(`/Shop/GetShopByUserId/${userId}?pageIndex=0&pageSize=1000`);
    },
    getShopByName: (shopName) => {
        return adminAxios.get(`/Shop/GetShopByName/${shopName}?pageIndex=0&pageSize=1000`);
    },

    getShopCateById: (shopCategoryId) => {
        return adminAxios.get(`ShopCategory/GetShopCategoryById/${shopCategoryId}`);
    },

    getShopCateByShopId: (shopId) => {
        return adminAxios.get(`ShopCategory/GetShopCategoriesByShopId/${shopId}?pageIndex=0&pageSize=1000`);
    },

    getShopCateByName: (categoryName) => {
        return adminAxios.get(`ShopCategory/GetShopCategoriesByName/${categoryName}?pageIndex=0&pageSize=1000`);
    },

    addShop: async (shop) => {
        try {
            const res = await adminAxios.post(`/Shop/CreateShop`, shop);
            return res;
        } catch (err) {
            throw err;
        }
    },
    addShopCate: async (shopCate) => {
        try {
            const res = await adminAxios.post(`/ShopCategory/CreateShopCategory`, shopCate);
            return res;
        } catch (err) {
            throw err;
        }
    },

    updateShop: async (shopId, shop) => {
        try {
             console.log(shopId, shop);
            const res = await adminAxios.put(`/Shop/UpdateShop/${shopId}`, shop);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    updateShopCate: async (shopCateId, shopCate) => {
        try {
            console.log(shopCateId, shopCate);
            const res = await adminAxios.put(`/ShopCategory/UpdateShopCategory/${shopCateId}`, shopCate);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    deleteShop: async (shopId) => {
        try {
            console.log(shopId);
            const res = await adminAxios.delete(`/Shop/DeleteShop/${shopId}`);
            return res;
        } catch (error) {
            console.log(error)
        }
    },

    deleteShopCate: async (shopCategoryId) => {
        try {
            console.log(shopCategoryId);
            const res = await adminAxios.delete(`/ShopCategory/DeleteShopCategory/${shopCategoryId}`);
            return res;
        } catch (error) {
            console.log(error)
        }
    },
};

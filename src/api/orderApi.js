import adminAxios from "./AxiosAdmin";

export const orderApi = {

    getAllOrders: () => {
        return  adminAxios.get(
            `/Order/GetHistoryOrder?pageIndex=0&pageSize=1000`
        );
    },

    getOrdersByOrderID: (orderId) => {
        return adminAxios.get(`/Order/GetOrderByOrderId/${orderId}`);
    },

    getAllOrderDetailsByOrderID: (orderId) => {
        return adminAxios.get(`/OrderDetail/GetHistoryOrderDetailByOrderId/${orderId}/orderItems?pageIndex=0&pageSize=1000`);
    },

    getSalesReportByEachMonth: () => {
        return adminAxios.get(`/SalesReport/GetSalesReportByEachMonth`);
    },

    addOrder: async (order) => {
        try {
            const res = await adminAxios.post(`/Order/CreateOrder`, order);
            return res;
        } catch (err) {
            throw err;
        }
    },
    addOrderDetail: async (orderId,shopCate) => {
        try {
            const res = await adminAxios.post(`/OrderDetail/${orderId}/orderItems`, shopCate);
            return res;
        } catch (err) {
            throw err;
        }
    },

    updateOrder: async (orderId, order) => {
        try {
            console.log(orderId, order);
            const res = await adminAxios.put(`/Order/UpdateOrder/${orderId}`, order);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    updateOrderDetail: async (orderId, orderDetail) => {
        try {
            console.log(orderId, orderDetail);
            const res = await adminAxios.put(`/OrderDetail/${orderId}/orderItems`, orderDetail);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    deleteOrder: async (orderId) => {
        try {
            console.log(orderId);
            const res = await adminAxios.delete(`/Order/DeleteOrder/${orderId}`);
            return res;
        } catch (error) {
            console.log(error)
        }
    },

    deleteOrderDetail: async (orderId,productId) => {
        try {
            const res = await adminAxios.delete(`/OrderDetail/${orderId}/orderItems/${productId}`);
            return res;
        } catch (error) {
            console.log(error)
        }
    },

    approveOrder: async (orderId) => {
        try {
            console.log(orderId);
            const res = await adminAxios.patch(`/Order/ApproveOrder/${orderId}`);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    rejectOrder: async (orderId) => {
        try {
            console.log(orderId);
            const res = await adminAxios.patch(`/Order/RejectOrder/${orderId}`);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },
};

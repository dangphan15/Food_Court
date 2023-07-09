import adminAxios from "./AxiosAdmin";

export const transactionApi = {

    getAllTransaction: () => {
        return  adminAxios.get(
            `/Transaction/GetAllTransactions?pageIndex=0&pageSize=1000`
        );
    },

    getAllSuccessTransaction: () => {
        return  adminAxios.get(
            `/Transaction/GetSuccessTransactions?pageIndex=0&pageSize=1000`
        );
    },

    getAllFailTransaction: () => {
        return  adminAxios.get(
            `/Transaction/GetFailTransactions?pageIndex=0&pageSize=1000`
        );
    },

    getTransactionById: (transactionId) => {
        return adminAxios.get(`/Transaction/GetTransactionById/${transactionId}`);
    },

    getTransactionByOrderId: (orderId) => {
        return adminAxios.get(`/Transaction/GetTransactionsByOrderId/${orderId}`);
    },

    getTransactionByWalletId: (walletId) => {
        return adminAxios.get(`/Transaction/GetTransactionByWalletId/${walletId}`);
    },

    getTransactionByTransactionCounterId: (transactionCounterId) => {
        return adminAxios.get(`/Transaction/GetTransactionsByTransactionCounterId/${transactionCounterId}`);
    },

    addTransaction: async (trans) => {
        try {
            const res = await adminAxios.post(`/api/Transaction/CreateTransaction`, trans);
            return res;
        } catch (err) {
            throw err;
        }
    },

    updateTransaction: async (transactionId, trans) => {
        try {
            console.log(transactionId, trans);
            const res = await adminAxios.put(`/api/Transaction/UpdateTransaction/${transactionId}`, trans);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    approachTransaction: async (transactionId, transStatus) => {
        try {
            console.log(transactionId, transStatus);
            const res = await adminAxios.patch(`/Transaction/ApproveTransaction/${transactionId}`, transStatus);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },
};

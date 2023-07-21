import adminAxios from "./AxiosAdmin";

export const transactionApi = {

    getAllTransaction: () => {
        return  adminAxios.get(
            `/Transaction/GetHistoryTransactions?pageIndex=0&pageSize=1000`
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

    getAllPendingTransaction: () => {
        return  adminAxios.get(
            `/Transaction/GetPendingTransactions?pageIndex=0&pageSize=1000`
        );
    },

    getTransactionById: (transactionId) => {
        return adminAxios.get(`/Transaction/GetTransactionById/${transactionId}`);
    },

    getTransactionByOrderId: (orderId) => {
        return adminAxios.get(`/Transaction/GetTransactionsByOrderId/${orderId}pageIndex=0&pageSize=1000`);
    },

    getTransactionByWalletId: (walletId) => {
        return adminAxios.get(`/Transaction/GetTransactionByWalletId/${walletId}pageIndex=0&pageSize=1000`);
    },

    getTransactionByTransactionCounterId: (transactionCounterId) => {
        return adminAxios.get(`/Transaction/GetTransactionsByTransactionCounterId/${transactionCounterId}pageIndex=0&pageSize=1000`);
    },

    addTransaction: async (trans) => {
        try {
            const res = await adminAxios.post(`/Transaction/CreateTransaction`, trans);
            return res;
        } catch (err) {
            throw err;
        }
    },

    updateTransaction: async (transactionId, trans) => {
        try {
            console.log(transactionId, trans);
            const res = await adminAxios.put(`/Transaction/UpdateTransaction/${transactionId}`, trans);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    deleteTransaction: async (transactionId) => {
        try {
            console.log(transactionId);
            const res = await adminAxios.delete(`/Transaction/DeleteTransaction/${transactionId}`);
            return res;
        } catch (error) {
            console.log(error)
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

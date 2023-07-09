import adminAxios from "./AxiosAdmin";

export const transactionCounterApi = {

    getAllTransactionCounter: () => {
        return  adminAxios.get(
            `/TransactionCounter/GetAllTransactionCounters?pageIndex=0&pageSize=1000`
        );
    },

    getTransactionCounterById: (transactionCounterId) => {
        return adminAxios.get(`/TransactionCounter/GetTransactionCounterById/${transactionCounterId}`);
    },

    getTransactionCounterByUserName: (userName) => {
        return adminAxios.get(`/TransactionCounter/GetTransactionCounterByUserName/${userName}`);
    },

    addTransactionCounter: async (transCounter) => {
        try {
            const res = await adminAxios.post(`/TransactionCounter/CreateTransactionCounter`, transCounter);
            return res;
        } catch (err) {
            throw err;
        }
    },

    updateTransactionCounter: async (transactionCounterId, transactionCounter) => {
        try {
            console.log(transactionCounterId, transactionCounter);
            const res = await adminAxios.put(`/TransactionCounter/UpdateTransactionCounter/${transactionCounterId}`, transactionCounter);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    deleteTransactionCounter: async (transactionCounterId) => {
        try {
            console.log(transactionCounterId);
            const res = await adminAxios.delete(`/TransactionCounter/DeleteTransactionCounter/${transactionCounterId}`);
            return res;
        } catch (error) {
            console.log(error)
        }
    },
};

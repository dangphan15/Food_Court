import adminAxios from "./AxiosAdmin";

export const walletApi = {

    getAllWallet: () => {
        return  adminAxios.get(
            `/Wallet/GetHistoryWallet?pageIndex=0&pageSize=1000`
        );
    },

    getAllActiveWallet: () => {
        return adminAxios.get(`/Wallet/GetActiveWallets?pageIndex=0&pageSize=1000`);
    },

    getAllInactiveWallet: () => {
        return adminAxios.get(`/Wallet/GetInActiveWallets?pageIndex=0&pageSize=1000`);
    },

    getWalletById: (walletId) => {
        return adminAxios.get(`/Wallet/GetWalletById/${walletId}`);
    },

    getWalletByCardId: (cardId) => {
        return adminAxios.get(`/Wallet/GetHistoryWalletsByCardId/${cardId}?pageIndex=0&pageSize=1000`);
    },

    addWallet: async (wallet) => {
        try {
            const res = await adminAxios.post(`/Wallet/CreateWallet`, wallet);
            return res;
        } catch (err) {
            throw err;
        }
    },

    updateWallet: async (walletId, wallet) => {
        try {
            console.log(walletId, wallet);
            const res = await adminAxios.put(`/Wallet/UpdateWallet/${walletId}`, wallet);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    approveWallet: async (walletId) => {
        try {
            console.log(walletId);
            const res = await adminAxios.patch(`/Wallet/ApprovedWallet/${walletId}`);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    approvedWallet: async (walletId) => {
        try {
            console.log(walletId);
            const res = await adminAxios.put(`/Wallet/ApprovedWallet/${walletId}`);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    deleteWallet: async (walletId) => {
        try {
            console.log(walletId);
            const res = await adminAxios.delete(`/Wallet/DeleteWallet/${walletId}`);
            return res;
        } catch (error) {
            console.log(error)
        }
    },

};

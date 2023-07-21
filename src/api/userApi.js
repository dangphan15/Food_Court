import adminAxios from "./AxiosAdmin";

export const userApi = {

    getAllUsers: async () => {
            return adminAxios.get(
                `/User/GetHistoryUser?pageIndex=0&pageSize=1000`
            );
    },

    getUserById: async (userId) => {
        return adminAxios.get(
            `/User/GetUserById/${userId}`
        );
    },

    login: async (account) => {
        try {
            const res = await adminAxios.post(`/User/Login`, account);
            console.log(res);
            return res;
        } catch (err) {
            throw err;
        }
    },

    register: async (account) => {
        try {
            console.log(account);
            const res = await adminAxios.post(`/User/Register`, account);
            return res;
        } catch (err) {
            throw err;
        }
    },

    update: async (userId,account) => {
        try {
            console.log(account);
            const res = await adminAxios.put(`/User/UpdateUserById/${userId}`, account);
            console.log(res);
            return res;
        } catch (err) {
            throw err;
        }
    },

    changPassword: async (userId,password) => {
        try {
            console.log(password);
            const res = await adminAxios.put(`/User/Change-Password/${userId}`, password);
            console.log(res);
            return res;
        } catch (err) {
            throw err;
        }
    },

};

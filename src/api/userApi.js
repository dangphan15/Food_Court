import adminAxios from "./AxiosAdmin";

export const userApi = {
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
            const res = await adminAxios.post(`/User/Register`, account);
            return res;
        } catch (err) {
            throw err;
        }
    },

};

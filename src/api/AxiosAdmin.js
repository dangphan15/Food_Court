import axios from "axios";
import Swal from "sweetalert2";
import {getTokenDataFromLocalStorage} from "../utils/serverUtils";

const adminAxios = axios.create({
     baseURL: process.env.REACT_APP_BACKEND_URL,
    //baseURL: "https://localhost:7199/api",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8"
        // Accept: "*/*",
        // "Content-Type": "text/html; charset=UTF-8",
        // "Content-Type": "multipart/form-data; boundary=something",
    },
});
adminAxios.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = getTokenDataFromLocalStorage();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

adminAxios.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        console.log(error.response.status);

        if (error.response.status === 401) {
            localStorage.clear();
            Swal.fire({
                title: " Phiên đăng nhập hết hạn!",
                text: "Tài khoản của bạn đã hết hạn!",
                showClass: {
                    popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
                icon: "error",
                confirmButtonText: "OK",
            }).then((confirm) => {
                window.location.href =
                    "http://localhost:3001/";
            });
        }
        throw error;
    }
);

export default adminAxios;

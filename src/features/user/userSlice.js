import { createSlice } from "@reduxjs/toolkit";
import {convertTokenToObject, getTokenDataFromLocalStorage} from "../../utils/serverUtils";

const initialState = {
    token: getTokenDataFromLocalStorage(),
    userAccountInfor: [],
    isloggedInSuccess: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        USER_LOADING_REQUEST: (state) => {
            state.loading = true;
        },
        USER_LOADING_ALL_SUCCESS: (state, action) => {
            const { data } = action.payload; // Assuming the relevant data is stored in the 'data' property
            state.loading = false;
            state.shops = data;
        },
        USER_LOADING_FAIL: (state, action) => {
            state.newErrorMessage = action.payload;
            state.loading = false;
        },
        USER_LOGIN_REQUEST: (state) => {
            state.token = getTokenDataFromLocalStorage();
            state.loading = true;
            state.isloggedInSuccess = null;
            state.isloggedOutSuccess = null;
        },

        USER_LOGIN_SUCCESS: (state, action) => {
            state.token = action.payload;
            state.userAccountInfor = convertTokenToObject();
            state.isloggedInSuccess = true;
            state.loading = false;
        },

        USER_LOGIN_FAIL: (state, action) => {
            state.token = null;
            state.isloggedInSuccess = false;
            state.loginErrorMessage = action.payload;
            state.loading = false;
        },
        USER_LOGOUT_SUCCESS: (state) => {
            state.token = null;
            state.userAccountInfor = null;
            state.loading = false;
            state.isloggedOutSuccess = true;
        },
        USER_CLEAR: (state) => {
            state.isloggedInSuccess = null;
            state.isloggedOutSuccess = null;
        },
        USER_UPDATE_SUCCESS: (state) => {
            state.token = getTokenDataFromLocalStorage();
            state.userAccountInfor = convertTokenToObject();
            state.loading = false;
        },
    },
});

export const {
    USER_LOADING_REQUEST,
    USER_LOADING_ALL_SUCCESS,
    USER_LOADING_FAIL,
    USER_LOADING_ONE_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_CLEAR,
    USER_LOGIN_FAIL,
    USER_UPDATE_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_LOGIN_SUCCESS,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;

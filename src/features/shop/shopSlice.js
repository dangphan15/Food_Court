import { createSlice } from "@reduxjs/toolkit";
import {convertTokenToObject, getTokenDataFromLocalStorage} from "../../utils/serverUtils";

const initialState = {
    token: getTokenDataFromLocalStorage(),
    shopAccountInfor: [],
    shops: [],
};

export const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        SHOP_LOADING_REQUEST: (state) => {
            state.loading = true;
        },
        SHOP_LOADING_ALL_SUCCESS: (state, action) => {
            const { data } = action.payload; // Assuming the relevant data is stored in the 'data' property
            state.loading = false;
            state.shops = data;
        },
        SHOP_LOADING_FAIL: (state, action) => {
            state.newErrorMessage = action.payload;
            state.loading = false;
        },
        SHOP_LOGIN_REQUEST: (state) => {
            state.token = getTokenDataFromLocalStorage();
            state.loading = true;
            state.isloggedInSuccess = null;
            state.isloggedOutSuccess = null;
        },

        SHOP_LOGIN_SUCCESS: (state, action) => {
            state.token = action.payload;
            state.shopAccountInfor = convertTokenToObject();
            state.isloggedInSuccess = true;
            state.loading = false;
        },

        SHOP_LOGIN_FAIL: (state, action) => {
            state.token = null;
            state.isloggedInSuccess = false;
            state.loginErrorMessage = action.payload;
            state.loading = false;
        },
        SHOP_LOGOUT_SUCCESS: (state) => {
            state.token = null;
            state.shopAccountInfor = null;
            state.loading = false;
            state.isloggedOutSuccess = true;
        },
        SHOP_CLEAR: (state) => {
            state.isloggedInSuccess = null;
            state.isloggedOutSuccess = null;
        },
        SHOP_UPDATE_SUCCESS: (state) => {
            state.token = getTokenDataFromLocalStorage();
            state.shopAccountInfor = convertTokenToObject();
            state.loading = false;
        },
    },
});

export const {
    SHOP_LOADING_REQUEST,
    SHOP_LOADING_ALL_SUCCESS,
    SHOP_LOADING_FAIL,
    SHOP_LOADING_ONE_SUCCESS,
    SHOP_LOGIN_REQUEST,
    SHOP_CLEAR,
    SHOP_LOGIN_FAIL,
    SHOP_UPDATE_SUCCESS,
    SHOP_LOGOUT_SUCCESS,
    SHOP_LOGIN_SUCCESS,
} = shopSlice.actions;

export const selectShop = (state) => initialState;

export default shopSlice.reducer;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SHOP_LOADING_ALL_SUCCESS } from "../../../../features/shop/shopSlice";
import {shopApi} from "../../../../api/shopApi";
import {userApi} from "../../../../api/userApi";

export const useGetShops = (skipFetch = false) => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getAllShops = async () => {
        setLoading(true);
        try {
            const response = await shopApi.getAllShops();
            console.log(response.result.items)
            dispatch(SHOP_LOADING_ALL_SUCCESS(response.result.items));
            setShops(response.result.items);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getAllShops();
        }
    }, []);

    return {
        data: shops,
        loading,
        error,
    };
};

export const useGetShopsPagination = (index, size, skipFetch = false) => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getAllShopsPagination = async (index, size) => {
        setLoading(true);
        try {
            const response = await shopApi.getAllShopsPagination(index, size);
            dispatch(SHOP_LOADING_ALL_SUCCESS(response.data.result.items));
            setShops(response.data.result.items);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getAllShopsPagination(index, size);
        }
    }, [index, size, skipFetch]); // Include index, size, and skipFetch in the dependency array

    return {
        data: shops,
        loading,
        error,
    };
};

export const useGetShopById = (id, skipFetch = false) => {
    const [shopItem, setShopItem] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getShop = async (id) => {
        setLoading(true);
        try {
            const response = await shopApi.getShopById(id);
            setShopItem(response.result);
        } catch (error) {
            console.log(error);
            if (error.response.status < 500) {
                setError("Can't find shop");
                return;
            }
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getShop(id);
        }
    }, []);

    return {
        data: shopItem,
        loading,
        error,
    };
};

export const useGetUsersByUserId = (skipFetch = false) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [option, setOption] = useState([])

    const getAllUsers = async () => {
        setLoading(true);
        try {
            const response = await userApi.getAllUsers();
            console.log(response)
            if(response.result !== null){
                setUsers(response.result.items);
            }
            if (users) {
                const list=response.result.items.map(row => {
                    const data = {
                        label : row.userName,
                        userId: row.userId,
                    }
                    return data;
                });
                setOption(list)
            }
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getAllUsers();
        }
    }, []);
    return {
        data: option,
        loading,
        error,
    };
};
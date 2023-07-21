import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SHOP_LOADING_ALL_SUCCESS } from "../../../../features/shop/shopSlice";
import {shopApi} from "../../../../api/shopApi";

export const useGetShopsByUserId = (id, skipFetch = false) => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getAllShopsByUserId = async () => {
        setLoading(true);
        try {
            const response = await shopApi.getShopByUserId(id);
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
            getAllShopsByUserId();
        }
    }, []);

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

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SHOP_LOADING_ALL_SUCCESS } from "../../../../features/shop/shopSlice";
import {shopApi} from "../../../../api/shopApi";

export const useGetShopCategories = (id, skipFetch = false) => {
    const [shopCates, setShopCates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getShopCateByShopId = async (id) => {
        setLoading(true);
        try {
            const response = await shopApi.getShopCateByShopId(id);
            console.log(response)
            if(response.result !== null){
                dispatch(SHOP_LOADING_ALL_SUCCESS(response.result));
                setShopCates(response.result.items);
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
            getShopCateByShopId(id);
        }
    }, []);

    return {
        data: shopCates,
        loading,
        error,
    };
};

export const useGetShopCategoriesByCateId = (id, skipFetch = false) => {
    const [shopCates, setShopCates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getShopCateByShopId = async (id) => {
        setLoading(true);
        try {
            const response = await shopApi.getShopCateById(id);
            console.log(response.result)
            dispatch(SHOP_LOADING_ALL_SUCCESS(response.result));
            setShopCates(response.result);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getShopCateByShopId(id);
        }
    }, []);

    return {
        data: shopCates,
        loading,
        error,
    };
};


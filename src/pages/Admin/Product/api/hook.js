import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SHOP_LOADING_ALL_SUCCESS } from "../../../../features/shop/shopSlice";
import {productApi} from "../../../../api/productApi";
import {shopApi} from "../../../../api/shopApi";

export const useGetProducts = (id, skipFetch = false) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getProductByShopCateId = async (id) => {
        setLoading(true);
        try {
            const response = await productApi.getProductByCateId(id);
            console.log(response)
            if(response.result !== null){
                setProducts(response.result.items);
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
            getProductByShopCateId(id);
        }
    }, []);

    return {
        data: products,
        loading,
        error,
    };
};

export const useGetProducByProdctId = (id, skipFetch = false) => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getProductByProductId = async (id) => {
        setLoading(true);
        try {
            const response = await productApi.getProductById(id);
            setProduct(response.result);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getProductByProductId(id);
        }
    }, []);

    return {
        data: product,
        loading,
        error,
    };
};


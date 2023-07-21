import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {orderApi} from "../../../../api/orderApi";

export const useGetOrders = (skipFetch = false) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getAllOrders = async () => {
        setLoading(true);
        try {
            const response = await orderApi.getAllOrders();
            console.log(response)
            if(response.result !== null){
                setOrders(response.result.items);
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
            getAllOrders();
        }
    }, []);

    return {
        data: orders,
        loading,
        error,
    };
};

export const useGetOrderById = (id, skipFetch = false) => {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getOrderById = async (id) => {
        setLoading(true);
        try {
            const response = await orderApi.getOrdersByOrderID(id);
            setOrder(response.result);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getOrderById(id);
        }
    }, []);

    return {
        data: order,
        loading,
        error,
    };
};


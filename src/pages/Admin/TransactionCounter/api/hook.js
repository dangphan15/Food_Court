import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {transactionCounterApi} from "../../../../api/transactionCounterApi";

export const useGetTransactionCounters = (skipFetch = false) => {
    const [transactionCounters, setTransactionCounters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getAllTransactionCounters = async () => {
        setLoading(true);
        try {
            const response = await transactionCounterApi.getAllTransactionCounter();
            console.log(response)
            if(response.result !== null){
                setTransactionCounters(response.result.items);
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
            getAllTransactionCounters();
        }
    }, []);

    return {
        data: transactionCounters,
        loading,
        error,
    };
};

export const useGetTransactionCounterById = (id, skipFetch = false) => {
    const [transactionCounter, setTransactionCounter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getTransactionCounterById = async (id) => {
        setLoading(true);
        try {
            const response = await transactionCounterApi.getTransactionCounterById(id);
            setTransactionCounter(response.result);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getTransactionCounterById(id);
        }
    }, []);

    return {
        data: transactionCounter,
        loading,
        error,
    };
};


import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {transactionApi} from "../../../../api/transactionApi";

export const useGetTransactions = (skipFetch = false) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getAllTransactions = async () => {
        setLoading(true);
        try {
            const response = await transactionApi.getAllTransaction();
            console.log(response)
            if(response.result !== null){
                setTransactions(response.result.items);
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
            getAllTransactions();
        }
    }, []);

    return {
        data: transactions,
        loading,
        error,
    };
};

export const useGetTransactionById = (id, skipFetch = false) => {
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getTransactionById = async (id) => {
        setLoading(true);
        try {
            const response = await transactionApi.getTransactionById(id);
            setTransaction(response.result);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getTransactionById(id);
        }
    }, []);

    return {
        data: transaction,
        loading,
        error,
    };
};


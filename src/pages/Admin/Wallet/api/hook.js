import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {walletApi} from "../../../../api/walletApi";

export const useGetWallets = (id, skipFetch = false) => {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getWalletByCardId = async (id) => {
        setLoading(true);
        try {
            const response = await walletApi.getWalletByCardId(id);
            console.log(response)
            if(response.result !== null){
                setWallets(response.result.items);
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
            getWalletByCardId(id);
        }
    }, []);

    return {
        data: wallets,
        loading,
        error,
    };
};

export const useGetWalletById = (id, skipFetch = false) => {
    const [wallet, setWallet] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getWalletById = async (id) => {
        setLoading(true);
        try {
            const response = await walletApi.getWalletById(id);
            console.log(response.result)
            setWallet(response.result);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getWalletById(id);
        }
    }, []);

    return {
        data: wallet,
        loading,
        error,
    };
};


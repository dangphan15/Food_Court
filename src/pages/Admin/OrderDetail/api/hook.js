import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {orderApi} from "../../../../api/orderApi";

export const useGetOrderDetails = (id, skipFetch = false) => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getOrderDetails = async (id) => {
        setLoading(true);
        try {
            console.log(id);
            const response = await orderApi.getAllOrderDetailsByOrderID(id);
            console.log(response)
            if(response.result !== null){
                setOrderDetails(response.result.items[0].orderDetails);
            }
            console.log(orderDetails);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getOrderDetails(id);
        }
    }, []);

    return {
        data: orderDetails,
        loading,
        error,
    };
};

// export const useGetOrderDetailById = (id, skipFetch = false) => {
//     const [wallet, setWallet] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const dispatch = useDispatch();
//
//     const getWalletById = async (id) => {
//         setLoading(true);
//         try {
//             const response = await walletApi.getWalletById(id);
//             console.log(response.result)
//             setWallet(response.result);
//         } catch (error) {
//             console.log(error);
//             setError("Internal Server Error");
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         if (!skipFetch) {
//             getWalletById(id);
//         }
//     }, []);
//
//     return {
//         data: wallet,
//         loading,
//         error,
//     };
// };


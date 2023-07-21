import { useEffect, useState } from "react";
import {orderApi} from "../../../api/orderApi";

export const useGetReports = (skipFetch = false) => {
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getReports = async () => {
        setLoading(true);
        try {
            const response = await orderApi.getSalesReportByEachMonth();
            console.log(response.result)
            if(response.result !== null){
                setReport(response.result);
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
            getReports();
        }
    }, []);

    return {
        data: report,
        loading,
        error,
    };
};
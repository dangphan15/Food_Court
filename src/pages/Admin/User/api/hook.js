import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {transactionApi} from "../../../../api/transactionApi";
import {userApi} from "../../../../api/userApi";

export const useGetUsers = (skipFetch = false) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getAllUsers = async () => {
        setLoading(true);
        try {
            const response = await userApi.getAllUsers();
            console.log(response)
            if(response.result !== null){
                setUsers(response.result.items);
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
        data: users,
        loading,
        error,
    };
};

export const useGetUserById = (id, skipFetch = false) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getUserById = async (id) => {
        setLoading(true);
        try {
            const response = await userApi.getUserById(id);
            setUser(response.result);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getUserById(id);
        }
    }, []);

    return {
        data: user,
        loading,
        error,
    };
};


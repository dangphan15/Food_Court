import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {cardTypeApi} from "../../../../api/cardTypeApi";

export const useGetCards = (skipFetch = false) => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getAllCards = async () => {
        setLoading(true);
        try {
            const response = await cardTypeApi.getAllCard();
            console.log(response)
            if(response.result !== null){
                setCards(response.result.items);
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
            getAllCards();
        }
    }, []);

    return {
        data: cards,
        loading,
        error,
    };
};

export const useGetCardById = (id, skipFetch = false) => {
    const [card, setCard] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getCardById = async (id) => {
        setLoading(true);
        try {
            const response = await cardTypeApi.getCardById(id);
            setCard(response.result);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getCardById(id);
        }
    }, []);

    return {
        data: card,
        loading,
        error,
    };
};

export const useGetCardByCardTypeId = (id, skipFetch = false) => {
    const [card, setCard] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getCardByCardTypeId = async (id) => {
        setLoading(true);
        try {
            const response = await cardTypeApi.getCardByCardTypeId(id);
            console.log(response)
            setCard(response.result);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getCardByCardTypeId(id);
        }
    }, []);

    return {
        data: card,
        loading,
        error,
    };
};

export const useGetCardTypeByCardTypeId = (id, skipFetch = false) => {
    const [cardType, setCardType] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getCardTypeById = async (id) => {
        setLoading(true);
        try {
            const response = await cardTypeApi.getCardTypeById(id);
            console.log(response)
            setCardType(response.result);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getCardTypeById(id);
        }
    }, []);

    return {
        data: cardType,
        loading,
        error,
    };
};

export const useGetAllCardType = (id, skipFetch = false) => {
    const [cardTypes, setCardTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getAllCardType = async (id) => {
        setLoading(true);
        try {
            const response = await cardTypeApi.getAllCardType(id);
            console.log(response)
            setCardTypes(response.result);
        } catch (error) {
            console.log(error);
            setError("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!skipFetch) {
            getAllCardType(id);
        }
    }, []);

    return {
        data: cardTypes,
        loading,
        error,
    };
};


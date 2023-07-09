import adminAxios from "./AxiosAdmin";

export const cardTypeApi = {

    getAllCard: () => {
        return  adminAxios.get(
            `/Card/GetAllCards?pageIndex=0&pageSize=1000`
        );
    },

    getAllCardType: () => {
        return  adminAxios.get(
            `/CardType/GetAllCardTypes?pageIndex=0&pageSize=1000`
        );
    },

    getCardById: (cardId) => {
        return adminAxios.get(`/Card/GetCardById/${cardId}`);
    },

    getCardByCardTypeId: (cardTypeId) => {
        return adminAxios.get(`/Card/GetCardsByCardTypeId/${cardTypeId}`);
    },

    getCardTypeById: (cardTypeId) => {
        return adminAxios.get(`/CardType/GetCardTypeById/${cardTypeId}`);
    },

    addCart: async (card) => {
        try {
            const res = await adminAxios.post(`/Card/CreateCard`, card);
            return res;
        } catch (err) {
            throw err;
        }
    },

    addCartType: async (cardType) => {
        try {
            const res = await adminAxios.post(`/CardType/CreateCardType`, cardType);
            return res;
        } catch (err) {
            throw err;
        }
    },

    updateCard: async (cardId, card) => {
        try {
            console.log(cardId, card);
            const res = await adminAxios.put(`/Card/UpdateCard/${cardId}`, card);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    updateCardType: async (cardTypeId, cardType) => {
        try {
            console.log(cardTypeId, cardType);
            const res = await adminAxios.put(`/CardType/UpdateCardType/${cardTypeId}`, cardType);
            console.log(res.status);
            return res;
        } catch (error) {
            console.log(error.response.error)
        }
    },

    deleteCard: async (cardId) => {
        try {
            console.log(cardId);
            const res = await adminAxios.delete(`/Card/DeleteCard/${cardId}`);
            return res;
        } catch (error) {
            console.log(error)
        }
    },

    deleteCardType: async (cardTypeId) => {
        try {
            console.log(cardTypeId);
            const res = await adminAxios.delete(`/CardType/DeleteCardType/${cardTypeId}`);
            return res;
        } catch (error) {
            console.log(error)
        }
    },
};

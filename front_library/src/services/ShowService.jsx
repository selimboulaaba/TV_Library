import axios from "axios";

const url = import.meta.env.VITE_BACK_URL + "/tvs";
const headers = {
    'Content-Type': 'application/json',
};

export const addToLibrary = async (payload) => {
    return await axios.post(url, payload, {
        headers: headers,
        withCredentials: true,
    })
}

export const getShows = async (type) => {
    return await axios.post(url + "/paginate", { type }, {
        headers: headers,
        withCredentials: true,
    })
}


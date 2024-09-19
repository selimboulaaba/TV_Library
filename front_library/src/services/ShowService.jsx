import axios from "axios";

const url = import.meta.env.VITE_BACK_URL + "/tvs";

export const addToLibrary = async (payload) => {
    return await axios.post(url, payload)
}

export const getShows = async (type) => {
    return await axios.post(url + "/paginate", { type })
}


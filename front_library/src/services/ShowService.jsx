import axios from "axios";

const url = import.meta.env.VITE_BACK_URL + "/tvs";

export const addToLibrary = async (payload) => {
    return await axios.post(url, payload)
}

export const getShows = async (type, page, status) => {
    return await axios.post(url + "/paginate", { type, page, status })
}

export const getShow = async (id, type) => {
    return await axios.get(url + "/tmdb/" + id + "/" + type)
}

export const removeFromLibrary = async (id, password) => {
    return await axios.delete(url + "/" + id + "/" + password)
}

export const updatePausedAt = async (id, pauseAt) => {
    return await axios.put(url + "/pauseAt/" + id, { pauseAt })
}

export const updateStatus = async (id, status) => {
    return await axios.put(url + "/status/" + id, { status })
}


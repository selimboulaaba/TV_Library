import axios from "axios";

const url = import.meta.env.VITE_BACK_URL + "/tvs";

export const addToLibrary = async (payload) => {
    return await axios.post(url, payload)
}

export const getShows = async (type, page) => {
    return await axios.post(url + "/paginate", { type, page })
}

export const getShow = async (id, isMovie) => {
    return await axios.get(url + "/tmdb/" + id + "/" + (isMovie === 'movie' ? "true" : "false"))
}

export const removeFromLibrary = async (id, password) => {
    return await axios.delete(url + "/" + id + "/" + password)
}

export const updatePausedAt = async (id, pauseAt) => {
    return await axios.put(url + "/" + id, { pauseAt })
}


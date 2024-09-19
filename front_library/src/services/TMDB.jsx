import axios from "axios";

const url = 'https://api.themoviedb.org/3/';
const headers = {
    accept: 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_TOKEN_TMDB
}

export const getSearch = async (search, page, isMovie) => {
    return await axios.get(url + 'search/' + isMovie + '?language=en-US&query=' + search + "&page=" + page, { headers })
}

export const getById = async (id, type) => {
    return await axios.get(url + type + "/" + id, { headers })
}

export const getTrailerById = async (id, type) => {
    return await axios.get(url + type + "/" + id + "/videos", { headers })
}

import axios from "axios";

const url = 'https://api.themoviedb.org/3/';
const headers = {
    accept: 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_TOKEN_TMDB
}

export const getSearch = async (search, page, type) => {
    return await axios.get(url + 'search/' + type + '?language=en-US&query=' + search + "&page=" + page, { headers })
}

export const getById = async (id, type) => {
    return await axios.get(url + (type === 'MOVIE' ? 'movie' : 'tv') + "/" + id, { headers })
}

export const getTrailerById = async (id, type) => {
    return await axios.get(url + (type === 'MOVIE' ? 'movie' : 'tv') + "/" + id + "/videos", { headers })
}

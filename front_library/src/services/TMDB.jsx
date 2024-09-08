import axios from "axios";

const url = 'https://api.themoviedb.org/3/search/movie?language=en-US&query='
const headers = {
    accept: 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_TOKEN_TMDB
}
export const getSearch = async (search, page) => {
    return await axios.get(url + search + "&page=" + page, { headers })
}
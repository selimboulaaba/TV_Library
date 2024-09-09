import axios from "axios";

const url = ['https://api.themoviedb.org/3/search/', '?language=en-US&query=']
const headers = {
    accept: 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_TOKEN_TMDB
}
export const getSearch = async (search, page, isMovie) => {
    return await axios.get(url[0] + isMovie + url[1] + search + "&page=" + page, { headers })
}
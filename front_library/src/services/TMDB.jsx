import axios from "axios";

const url = 'https://api.themoviedb.org/3/search/movie?language=en-US&query='
const headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjcyNmY1MjYxYjZiOTJlYmNkMjg4OWExMWM2ODAxNSIsIm5iZiI6MTcyNTc2MzYyMS42MDY4NDEsInN1YiI6IjY2ZGQwZjk3ZjEzZWVhNWU2NTc4NzQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lhF076QCggu7KBFNqlikOwV_gr6EsbrI_ST-QxnkMbg'
}
export const getSearch = async (search, page) => {
    return await axios.get(url + search + "&page=" + page, { headers })
}
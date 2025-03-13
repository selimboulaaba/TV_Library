import axios from "axios";

const url = import.meta.env.VITE_BACK_URL + "/tvs";

export const login = async (payload) => {
    return await axios.post(url + "/login", payload)
}

export const regster = async (payload) => {
    return await axios.post(url + "/register", payload)
}


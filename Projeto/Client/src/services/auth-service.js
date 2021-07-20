import axios from 'axios';

const BASE_URL = `${process.env.VUE_APP_SERVER_HOST}/oapi`;

export async function login(data) {
    return await axios.post(`${BASE_URL}/login`, data);
}

export async function forgotPassword(data) {
    return await axios.post(`${BASE_URL}/forgot-password`, data);
}

export async function changePassword(data) {
    return await axios.post(`${BASE_URL}/change-password`, data);
}
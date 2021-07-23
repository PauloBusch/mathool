import axios from 'axios';

const BASE_URL = `${process.env.VUE_APP_SERVER_HOST}/oapi`;

export async function loginAsync(data) {
    return await axios.post(`${BASE_URL}/login`, data);
}

export async function forgotPasswordAsync(data) {
    return await axios.post(`${BASE_URL}/forgot-password`, data);
}

export async function changePasswordAsync(data) {
    return await axios.post(`${BASE_URL}/change-password`, data);
}
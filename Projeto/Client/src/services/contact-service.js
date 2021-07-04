import axios from 'axios';

const BASE_URL = `${process.env.VUE_APP_SERVER_HOST}/oapi/contact`;

export async function sendEmailAsync(data) {
    return await axios.post(`${BASE_URL}/send-email`, data);
}
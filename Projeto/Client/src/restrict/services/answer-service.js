import axios from 'axios';

const API_BASE_URL = `${process.env.VUE_APP_SERVER_HOST}/api/answers`;

export async function createAsync(data) {
    return await axios.post(API_BASE_URL, data);
}
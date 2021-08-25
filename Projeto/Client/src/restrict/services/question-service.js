import axios from 'axios';

const API_BASE_URL = `${process.env.VUE_APP_SERVER_HOST}/api/questions`;

export async function getLastAsync() {
    return await axios.get(`${API_BASE_URL}/last`);
}

export async function goNextAsync() {
    return await axios.get(`${API_BASE_URL}/next`);
}
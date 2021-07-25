import axios from 'axios';

const OAPI_BASE_URL = `${process.env.VUE_APP_SERVER_HOST}/oapi/users`;

export async function createAsync(data) {
    return await axios.post(OAPI_BASE_URL, data);
}
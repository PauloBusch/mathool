import axios from 'axios';

const API_BASE_URL = `${process.env.VUE_APP_SERVER_HOST}/api/student-class`;

export async function getAsync() {
    return await axios.get(API_BASE_URL + '/');
}

export async function updateAsync(data) {
    return await axios.put(API_BASE_URL + '/', data);
}

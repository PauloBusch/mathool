import axios from 'axios';
import { getTokenStorage } from '@/shared/services/storage-service';

const API_BASE_URL = `${process.env.VUE_APP_SERVER_HOST}/api/classes`;


export async function createAsync(data) {
    return await axios.post(
        API_BASE_URL, 
        data,
        {
            headers: {
                Authorization: 'Bearer ' + getTokenStorage()
            }
        }
    );
}

export async function getAllAsync() {
    return await axios.get(
        API_BASE_URL,
        {
            headers: {
                Authorization: 'Bearer ' + getTokenStorage()
            }
        }
    );
}

export async function getByIdAsync(id) {
    return await axios.get(
        API_BASE_URL + '/'+ id, 
        {
            headers: {
                Authorization: 'Bearer ' + getTokenStorage()
            }
        },
        id
    );
}

export async function updateAsync(data) {
    return await axios.put(
        API_BASE_URL + '/'+ data.id, 
        data,
        {
            headers: {
                Authorization: 'Bearer ' + getTokenStorage()
            }
        }
    );
}

export async function deleteAsync(id) {
    return await axios.delete(
        `${API_BASE_URL}:${id}`,
        {
            headers: {
                Authorization: 'Bearer ' + getTokenStorage()
            }
        }
    );
}
import axios from 'axios';
import { getTokenStorage } from '@/shared/services/storage-service';

const API_BASE_URL = `${process.env.VUE_APP_SERVER_HOST}/api/student-class`;

export async function getAsync() {
    return await axios.get(
        API_BASE_URL + '/', 
        {
            headers: {
                Authorization: 'Bearer ' + getTokenStorage()
            }
        }
    );
}
export async function getAllStudentByClassCodeAsync(classCode) {
    return await axios.get(
        API_BASE_URL + '/' + classCode, 
        {
            headers: {
                Authorization: 'Bearer ' + getTokenStorage()
            }
        }
    );
}

export async function updateAsync(data) {
    return await axios.put(
        API_BASE_URL + '/', 
        data,
        {
            headers: {
                Authorization: 'Bearer ' + getTokenStorage()
            }
        }
    );

    
}

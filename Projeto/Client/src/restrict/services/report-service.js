import axios from 'axios';
import { getTokenStorage } from '@/shared/services/storage-service';

const API_REPORT_STUDENT_URL = `${process.env.VUE_APP_SERVER_HOST}/api/report-student`;
// const API_BASE_URL = `${process.env.VUE_APP_SERVER_HOST}/api/report-student`;

export async function getReportAnswerByMyUserAsync() {
    return await axios.get(
        API_REPORT_STUDENT_URL + '/', 
        {
            headers: {
                Authorization: 'Bearer ' + getTokenStorage()
            }
        }
    );
}

export async function getReportAnswerByUserIdAsync(id) {
    return await axios.get(
        `${API_REPORT_STUDENT_URL}:${id}`,
        {
            headers: {
                Authorization: 'Bearer ' + getTokenStorage()
            }
        }
    );
}

export async function updateAsync(data) {
    return await axios.put(
        API_REPORT_STUDENT_URL + '/', 
        data,
        {
            headers: {
                Authorization: 'Bearer ' + getTokenStorage()
            }
        }
    );

    
}

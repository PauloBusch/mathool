import axios from 'axios';


const API_REPORT_STUDENT_URL = `${process.env.VUE_APP_SERVER_HOST}/api/report-student`;

export async function getReportAnswerByMyUserAsync() {
    return await axios.get(API_REPORT_STUDENT_URL + '/');
}

export async function getReportAnswerByUserIdAsync(id) {
    return await axios.get(`${API_REPORT_STUDENT_URL}/${id}`);
}

export async function updateAsync(data) {
    return await axios.put(API_REPORT_STUDENT_URL + '/', data);
}

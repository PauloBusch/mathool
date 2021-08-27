import axios from 'axios';


const API_REPORT_CLASS_URL = `${process.env.VUE_APP_SERVER_HOST}/api/report-class`;

export async function getReportAnswerByClassIdAsync(id) {
    return await axios.get(`${API_REPORT_CLASS_URL}/${id}`);
}
export async function getReportAllClassAsync() {
    return await axios.get(`${API_REPORT_CLASS_URL}/`);
}


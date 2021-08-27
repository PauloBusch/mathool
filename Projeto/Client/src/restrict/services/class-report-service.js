import axios from 'axios';


const API_REPORT_STUDENT_URL = `${process.env.VUE_APP_SERVER_HOST}/api/report-student`;

export async function getReportAnswerByClassIdAsync(id) {
    return await axios.get(`${API_REPORT_STUDENT_URL}/${id}`);
}


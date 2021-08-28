const express = require('express');

const roles = require('./utils/enums/roles');
const authMidware = require('./midwares/auth-midware');
const roleMidware = require('./midwares/role-midware');
const classService = require('./services/class.service');
const authService = require('./services/auth.service');
const userService = require('./services/user.service');
const studentService = require('./services/student.service');
const contactService = require('./services/contact.service');
const questionService = require('./services/question.service');
const answerService = require('./services/answer.service');
const studentReportService = require('./services/student-report.service');
const classReportService = require('./services/class-report.service');
const questionReportService = require('./services/question-report.service');

function routes(server) {
  const protectedApi = express.Router();
  server.use('/api', protectedApi);
  
  protectedApi.use(authMidware);
  
  protectedApi.get('/users', roleMidware([roles.TEACHER]), userService.getAllAsync);
  protectedApi.get('/users/:id', userService.getByIdAsync);
  protectedApi.put('/users/:id', userService.updateAsync);

  protectedApi.get('/classes', classService.getAllClassAsync);
  protectedApi.post('/classes', roleMidware([roles.TEACHER]), classService.createAsync);
  protectedApi.get('/classes/:id', roleMidware([roles.TEACHER]), classService.getByIdAsync);
  protectedApi.put('/classes/:id', roleMidware([roles.TEACHER]), classService.updateAsync);
  protectedApi.delete('/classes/:id', roleMidware([roles.TEACHER]), classService.removeAsync);

  protectedApi.put('/active-class/:id', roleMidware([roles.TEACHER]), classService.indexAsync);
  
  protectedApi.put('/student-class', studentService.updateStudentClassAsync);
  protectedApi.get('/student-class', studentService.getAsync);
  protectedApi.get('/student-class/:classCode', studentService.getAllStudentByClassCodeAsync);

  protectedApi.get('/questions/last', roleMidware([roles.STUDENT]), questionService.getLastAsync);
  protectedApi.get('/questions/next', roleMidware([roles.STUDENT]), questionService.nextAsync);
  protectedApi.post('/answers', roleMidware([roles.STUDENT]), answerService.createAsync);

  protectedApi.get('/report-student', roleMidware([roles.STUDENT]), studentReportService.getReportAnswerByMyUserAsync);
  protectedApi.get('/report-student/:id', roleMidware([roles.TEACHER]), studentReportService.getReportAnswerByUserIdAsync);

  protectedApi.get('/report-class/:classCode', roleMidware([roles.TEACHER]), classReportService.getReportClassByClassCodeAsync);
  protectedApi.get('/report-class/', roleMidware([roles.TEACHER]), classReportService.getReportAllClassAsync);
  
  protectedApi.get('/report-questions/:student', roleMidware([roles.TEACHER]), questionReportService.getReportAllQuestionByStudentAsync);
  protectedApi.get('/report-questions/:id', roleMidware([roles.TEACHER]), questionReportService.getReportQuestionByIdAsync);
  
  
  const openApi = express.Router();
  server.use('/oapi', openApi);

  openApi.post('/login', authService.loginAsync);
  openApi.post('/forgot-password', authService.forgotPasswordAsync);
  openApi.post('/change-password', authService.changePasswordWithTokenAsync);
  openApi.post('/users', userService.createAsync);
  openApi.post('/contact/send-email', contactService.sendEmailAsync);
}

module.exports = { routes };

const express = require('express');

const roles = require('./utils/enums/roles');
const authMidware = require('./midwares/auth-midware');
const roleMidware = require('./midwares/role-midware');
const classService = require('./services/class.service');
const authService = require('./services/auth.service');
const userService = require('./services/user.service');
const studentService = require('./services/student.service');
const contactService = require('./services/contact.service');

function routes(server) {
  const protectedApi = express.Router();
  server.use('/api', protectedApi);
  
  protectedApi.use(authMidware);

  protectedApi.get('/classes', classService.getAllAsync);
  protectedApi.post('/classes', roleMidware([roles.Teacher]), classService.createAsync);
  protectedApi.get('/classes/:id', roleMidware([roles.Teacher]), classService.getByIdAsync);
  protectedApi.put('/classes/:id', roleMidware([roles.Teacher]), classService.updateAsync);
  protectedApi.delete('/classes/:id', roleMidware([roles.Teacher]), classService.removeAsync);

  protectedApi.put('/active-class/:id', roleMidware([roles.Teacher]), classService.indexAsync);
  
  protectedApi.put('/student-class/', studentService.updateStudentClassAsync);
  protectedApi.get('/student-class/', studentService.getAsync);
  
  protectedApi.get('/users', roleMidware([roles.Teacher]), userService.getAllAsync);
  protectedApi.get('/users/:id', userService.getByIdAsync);
  protectedApi.put('/users/:id', userService.updateAsync);

  const openApi = express.Router();
  server.use('/oapi', openApi);

  openApi.post('/login', authService.loginAsync);
  openApi.post('/forgot-password', authService.forgotPasswordAsync);
  openApi.post('/change-password', authService.changePasswordWithTokenAsync);
  openApi.post('/users', userService.createAsync);
  openApi.post('/contact/send-email', contactService.sendEmailAsync);
}

module.exports = { routes };

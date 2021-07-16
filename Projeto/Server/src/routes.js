const express = require('express');

const roles = require('./utils/enums/roles');
const authMidware = require('./midwares/auth-midware');
const roleMidware = require('./midwares/role-midware');
const classService = require('./services/class.service');
const authService = require('./services/auth.service');
const userService = require('./services/user.service');
const contactService = require('./services/contact.service');

function routes(server) {
  const protectedApi = express.Router();
  server.use('/api', protectedApi);
  
  protectedApi.use(authMidware);

  protectedApi.get('/classes', classService.getAllAsync);
  protectedApi.post('/classes', classService.createAsync);
  protectedApi.get('/classes/:id', classService.getByIdAsync);
  protectedApi.put('/classes/:id', classService.updateAsync);
  protectedApi.delete('/classes/:id', classService.removeAsync);

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

const express = require('express');

const auth = require('./midwares/auth-midware');
const classService = require('./services/class.service');
const userService = require('./services/user.service');
const contactService = require('./services/contact.service');

function routes(server) {
  const protectedApi = express.Router();
  server.use('/api', protectedApi);
  
  protectedApi.use(auth);

  protectedApi.get('/classes', classService.getAllAsync);
  protectedApi.post('/classes', classService.createAsync);
  protectedApi.get('/classes/:id', classService.getByIdAsync);
  protectedApi.put('/classes/:id', classService.updateAsync);
  protectedApi.delete('/classes/:id', classService.removeAsync);

  protectedApi.get('/users', userService.getAllAsync);
  protectedApi.get('/users/:id', userService.getByIdAsync);
  protectedApi.put('/users/:id', userService.updateAsync);

  const openApi = express.Router();
  server.use('/oapi', openApi);

  openApi.post('/login', userService.loginAsync);
  openApi.post('/users', userService.createAsync);
  openApi.post('/contact/send-email', contactService.sendEmailAsync);
}

module.exports = { routes };

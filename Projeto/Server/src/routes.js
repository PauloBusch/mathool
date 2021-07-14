const express = require('express');

const classService = require('./services/class.service');
const contactService = require('./services/contact.service');

function routes(server) {  
  const protectedApi = express.Router();
  server.use('/api', protectedApi);

  protectedApi.get('class', classService.getAllAsync);
  protectedApi.post('class', classService.createAsync);
  protectedApi.get('class/:id', classService.getByIdAsync);
  protectedApi.put('class/:id', classService.updateAsync);
  protectedApi.delete('class/:id', classService.removeAsync);

  const openApi = express.Router();
  server.use('/oapi', openApi);

  openApi.post('/contact/send-email', contactService.sendEmailAsync);
}

module.exports = { routes };

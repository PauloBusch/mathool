const express = require('express');

const { classService } = require('./services/class.service');
const { sendEmail } = require('./services/contact.service');

function routes(server) {  
  const protectedApi = express.Router();
  server.use('/api', protectedApi);

  classService.register(protectedApi);

  const openApi = express.Router();
  server.use('/oapi', openApi);

  openApi.post('/contact/send-email', sendEmail);
}

module.exports = { routes };

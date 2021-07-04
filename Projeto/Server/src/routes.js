const express = require('express');

const { sendEmail } = require('./services/contact.service');

function routes(server) {  
  const openApi = express.Router();
  server.use('/oapi', openApi);

  openApi.post('/contact/send-email', sendEmail);
}

module.exports = { routes };

const express = require('express');

function routes(server) {  
  const openApi = express.Router();
  server.use('/oapi', openApi);
}

module.exports = { routes };

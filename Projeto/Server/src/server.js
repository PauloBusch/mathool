const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const port = parseInt(process.env.SERVER_PORT);
server.listen(port, function() {
  console.log(`SERVER running on port: ${port}`);
});

module.exports = { server };

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

require('./database/mongo');
const { server } = require('./server');
const { routes } = require('./routes');

routes(server);

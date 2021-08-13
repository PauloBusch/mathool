const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

require('./database/mongo');
require('./database/mysql');
const { server } = require('./server');
const { routes } = require('./routes');

routes(server);

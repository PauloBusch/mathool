const { connect } = require('mongoose');

function getConnectionString() {
    const { DB_MONGO_USER, DB_MONGO_PASS, DB_MONGO_HOST, DB_MONGO_PORT, DB_MONGO_NAME } = process.env;
    const credentials = DB_MONGO_USER && DB_MONGO_PASS ?  `${DB_MONGO_USER}:${DB_MONGO_PASS}@` : '';

    return `mongodb://${credentials}${DB_MONGO_HOST}:${DB_MONGO_PORT}/${DB_MONGO_NAME}`;
}

connect(
    getConnectionString(), 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true 
    }
);
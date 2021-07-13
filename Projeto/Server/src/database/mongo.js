const { connect } = require('mongoose');

function getConnectionString() {
    const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
    const credentials = DB_USER && DB_PASS ?  `${DB_USER}:${DB_PASS}@` : '';

    return `mongodb://${credentials}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

connect(getConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true });
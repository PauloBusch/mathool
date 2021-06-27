const express = require('express');
const bodyParse = require('body-parser');
const { Router} = require('./router');

const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extend: false}));
app.use(Router);


app.listen(3000);
"use strict";

const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use('/users', require('./api/user'));
app.use('/swg-doc', express.static(path.join(__dirname, './node_modules/swagger-ui/dist')));
app.use('/v1/swagger.json', (req, res) => {
    res.json(require('./swagger.json'));
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;

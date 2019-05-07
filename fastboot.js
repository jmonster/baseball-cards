/* eslint-env node */
const express = require('express');
const fastbootMiddleware = require('fastboot-express-middleware');

const app = express();
app.get('/*', fastbootMiddleware('/tmp/diss'));

module.exports = app;

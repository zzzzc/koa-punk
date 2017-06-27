/*
 * @Author: zoucong
 * @Date:   2017-06-16 14:23:22
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-27 12:55:06
 */

'use strict';

const Koa = require('koa');
const apiRouter = require('./router/api.js');
const bodyParser = require('koa-bodyparser');

const errorMiddleWare = require('./bin/middlewares/error');
const { port } = require('./config');

const app = new Koa();

app.use(bodyParser());
app.use(errorMiddleWare);
app.use(apiRouter.routes());

app.listen(port);

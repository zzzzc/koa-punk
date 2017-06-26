/*
 * @Author: zoucong
 * @Date:   2017-06-16 14:23:22
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-26 19:02:25
 */

'use strict';

const Koa = require('koa');
const apiRouter = require('./router/api.js');
const bodyParser = require('koa-bodyparser');
const { port } = require('./config');

const app = new Koa();

app.use(bodyParser());

// error catcher
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    console.log(err);
  }
});

app.use(apiRouter.routes());

app.listen(port);

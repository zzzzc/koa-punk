/*
 * @Author: zoucong
 * @Date:   2017-06-16 14:23:22
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-23 13:51:24
 */

'use strict';

const Koa = require('koa');
const apiRouter = require('./router/api.js');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());
app.use(apiRouter.routes());

app.listen(3000);

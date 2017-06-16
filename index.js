/*
* @Author: zoucong
* @Date:   2017-06-16 14:23:22
* @Last Modified by:   zoucong
* @Last Modified time: 2017-06-16 15:16:35
*/

'use strict';

const Koa = require('koa');
const apiRouter = require('./router/api.js');

const app = new Koa();

app.use(apiRouter.routes());

app.listen(3000);









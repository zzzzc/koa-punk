/*
* @Author: zoucong
* @Date:   2017-06-16 14:37:37
* @Last Modified by:   zoucong
* @Last Modified time: 2017-06-16 15:47:46
*/

'use strict';

const Router = require('koa-router');
const Collection = require ('../bin/collection.js');

const apiRouter = new Router();

apiRouter.all("/:apiName", async function (ctx,next) {
  const apiName = ctx.params.apiName;
  const collection = new Collection(apiName);
  const res = await collection.find({});
  ctx.body = res;
  next();
});

module.exports = apiRouter;







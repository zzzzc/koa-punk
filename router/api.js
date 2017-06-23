/*
 * @Author: zoucong
 * @Date:   2017-06-16 14:37:37
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-23 13:48:41
 */

'use strict';

const Router = require('koa-router');
const config = require('../config/');
const utils = require('../bin/utils.js');
const Collection = require ('../bin/collection.js');
const db = require('../bin/db.js');

const apiRouter = new Router();

apiRouter.get("/:apiName", async function (ctx, next) {
  const apiName = ctx.params.apiName;
  const collection = new Collection(apiName);

  const page = utils.toNumber(ctx.query.page, 1);
  const querySize = utils.toNumber(ctx.query.pageSize, config.pageSize);
  const pageSize = querySize <= config.maxDBSize ? 
    querySize : config.maxDBSize;
  const start = (page - 1) * pageSize;
  const query = Object.assign({}, ctx.query,
    { pageSize: undefined, page: undefined });

  const res = await collection.find(query, start, pageSize);
  const total = await collection.count(query);
  
  ctx.body = {
    total: total,
    totalPage: Math.ceil(total / pageSize),
    page,
    pageSize: pageSize,
    data: res
  };

  next();
});

apiRouter.delete("/:apiName", async function (ctx, next){
  const apiName = ctx.params.apiName;
  
  await db.dropCollection(apiName);
  ctx.status = 200;
  next();
});

apiRouter.post("/:apiName", async function (ctx, next) {
  const apiName = ctx.params.apiName;
  const collection = new Collection(apiName);
  const items = Array.isArray(ctx.request.body) 
    ? ctx.request.body : [ctx.request.body];
  
  ctx.body = await collection.insertMany(items);
  next();
});

module.exports = apiRouter;

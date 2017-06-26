/*
 * @Author: zoucong
 * @Date:   2017-06-16 14:37:37
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-26 19:03:52
 */

'use strict';

const Router = require('koa-router');
const config = require('../config/');
const utils = require('../bin/utils.js');
const Collection = require('../bin/collection.js');
const db = require('../bin/db.js');
const { ObjectID } = require('mongodb');

const apiRouter = new Router();

async function queryList(collection, query) {
  const page = utils.toNumber(query.page, 1);
  const querySize = utils.toNumber(query.pageSize, config.pageSize);
  const pageSize = querySize <= config.maxDBSize ?
    querySize : config.maxDBSize;
  const start = (page - 1) * pageSize;
  const findQuery = Object.assign({}, query,
    { pageSize: undefined, page: undefined });

  const res = await collection.find(findQuery, start, pageSize);
  const total = await collection.count(findQuery);

  return {
    total: total,
    totalPage: Math.ceil(total / pageSize),
    page,
    pageSize: pageSize,
    data: res
  };
}

// list api
apiRouter.all("/:apiName", async function (ctx, next) {
  const apiName = ctx.params.apiName;
  const collection = new Collection(apiName);

  switch (ctx.method) {
    case "GET":
      ctx.body = await queryList(collection, ctx.query);
      break;

    case "POST":
      const items = Array.isArray(ctx.request.body)
        ? ctx.request.body : [ctx.request.body];
      ctx.body = await collection.insertMany(items);
      break;

    case "DELETE":
      await collection.drop();
      ctx.body = 'ok';
      break;
  }
  next();
});

// item api
apiRouter.all("/:apiName/:id", async function (ctx, next) {
  const { apiName, id } = ctx.params;
  const collection = new Collection(apiName);
  const _id = new ObjectID(id);
  const query = { _id };
  let res;

  switch (ctx.method) {
    case 'DELETE':
      await collection.remove(query);
      res = 'ok';
      break;

    case 'GET':
      const item = await collection.find(query, 0, 1);
      res = item[0];
      break;
  }

  res && (ctx.body = res);
  next();
});

module.exports = apiRouter;

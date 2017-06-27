/*
 * @Author: zoucong
 * @Date:   2017-06-16 14:37:37
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-27 15:10:01
 */

'use strict';

const Router = require('koa-router');
const config = require('../config/');
const utils = require('../bin/utils.js');
const { db, getCollection } = require('../bin/db');
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

// show collections
apiRouter.get("/apilist", async function (ctx, next) {
  ctx.body = (await db.listCollections())
    .filter(d => d.type === 'collection')
    .map(d => d.name);
});

// list api
apiRouter.all("/:apiName", async function (ctx, next) {
  const apiName = ctx.params.apiName;
  const collection = getCollection(apiName);

  switch (ctx.method) {
    case "GET":
      ctx.body = await queryList(collection, ctx.query);
      break;

    case "POST":
      ctx.body = await collection.insert(ctx.request.body);
      break;

    case "DELETE":
      try {
        await collection.drop();
        ctx.body = 'ok';
      } catch (e) {
        ctx.status = 404;
      }
      break;
  }
  next();
});

// item api
apiRouter.all("/:apiName/:id", async function (ctx, next) {
  const { apiName, id } = ctx.params;
  const collection = getCollection(apiName);
  let _id, res;

  try {
    _id = new ObjectID(id);
  } catch (e) {
    ctx.status = 404;
    return next();
  }

  const query = { _id };

  switch (ctx.method) {
    case 'DELETE':
      await collection.delete(query);
      res = 'ok';
      break;

    // case 'POST': //'post' method same as 'put'
    case 'PUT':
    case 'PATCH':
      const { body } = ctx.request;
      await (ctx.method === 'PATCH' ?
        collection.update(query, body) :
        collection.replace(query, body));

    case 'GET':
      const item = await collection.find(query, 0, 1);
      res = item[0];
      break;
  }

  res && (ctx.body = res);
  next();
});

module.exports = apiRouter;

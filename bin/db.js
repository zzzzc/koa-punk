/*
 * @Author: zoucong
 * @Date:   2017-06-16 18:44:10
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-23 13:50:42
 */

'use strict';

const connect = require('./connect.js');

module.exports = {
  async createCollection(name) {
    const db = await connect;
    return await db.createCollection(name);
  },

  async dropCollection(name){
    const db = await connect;
    return await db.dropCollection(name);
  }
};

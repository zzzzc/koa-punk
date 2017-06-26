/*
 * @Author: zoucong
 * @Date:   2017-06-16 15:16:42
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-26 14:55:25
 */

'use strict';

const connect = require('./connect.js');
const { maxDBSize } = require('../config/');

module.exports = class Collection {
  constructor(name) {
    this.collection = connect.then(db => db.collection(name));
  }

  async insert(data) {
    const collection = await this.collection;
    return await collection.insert(data);
  }

  async insertMany(data) {
    const collection = await this.collection;
    return await collection.insertMany(data);
  }

  async count(query) {
    const collection = await this.collection;
    return await collection.count(query);
  }

  async find(query, start = 0, size = maxDBSize) {
    const collection = await this.collection;
    return await collection.find(query).
      skip(start).limit(size).toArray();
  }

  async remove(query) {
    const collection = await this.collection;
    return await collection.remove(query);
  }

  async drop() {
    const collection = await this.collection;
    return await collection.drop();
  }

}

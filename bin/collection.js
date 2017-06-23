/*
 * @Author: zoucong
 * @Date:   2017-06-16 15:16:42
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-23 13:50:14
 */

'use strict';

const connect = require('./connect.js');
const { maxDBSize } = require('../config/');

module.exports = class Collection {
  constructor(name) {
    this.name = name;
  }

  async getCollection() {
    return this.collection ||
      (this.collection = (await connect).collection(this.name));
  }

  async insert (data) {
    const collection = await this.getCollection();
    return await collection.insert(data);
  }

  async insertMany(data) {
    const collection = await this.getCollection();
    return await collection.insertMany(data);
  }

  async count(query) {
    const collection = await this.getCollection();
    return await collection.count(query);
  }

  async find(query, start = 0, size = maxDBSize) {
    const collection = await this.getCollection();
    return await collection.find(query).
      skip(start).limit(size).toArray();
  }

  async remove(query) {
    const collection = await this.getCollection();
    return await collection.remove(query);
  }

}

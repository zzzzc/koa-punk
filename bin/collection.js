/*
* @Author: zoucong
* @Date:   2017-06-16 15:16:42
* @Last Modified by:   zoucong
* @Last Modified time: 2017-06-16 17:04:06
*/

'use strict';
const MongoClient = require('mongodb').MongoClient;
const dbPath = require('../config/').dbPath;

const connect = MongoClient.connect(dbPath);

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

  async find(query) {
    const collection = await this.getCollection();
    return await collection.find(query).toArray();
  }

  async remove(query) {
    const collection = await this.getCollection();
    return await collection.remove(query);
  }

}















/*
 * @Author: zoucong
 * @Date:   2017-06-16 15:16:42
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-27 14:18:48
 */

'use strict';

const connect = require('./connect.js');
const { maxDBSize } = require('../../config/');

module.exports = class Collection {
  constructor(name) {
    this.collection = connect.then(db => db.collection(name));
  }

  callMethod(method) {
    const self = this;
    return async function (...arg) {
      const collection = await self.collection;
      return await collection[method](...arg);
    }
  }

  async find(query, start = 0, size = maxDBSize) {
    return (await this.callMethod('find')(query))
      .skip(start).limit(size).toArray();
  }

  insert(data) {
    return this.callMethod
      (Array.isArray(data) ? 'insertMany' : 'insertOne')
      (data);
  }

  count(query) {
    return this.callMethod('count')(query);
  }

  delete(query) {
    return this.callMethod('findOneAndDelete')(query);
  }

  drop() {
    return this.callMethod('drop')();
  }

  replace(query, data) {
    return this.callMethod('findOneAndReplace')(query, data);
  }

  update(query, data) {
    return this.callMethod('findOneAndUpdate')(query, { $set: data });
  }
};

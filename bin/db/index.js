/*
 * @Author: zoucong 
 * @Date: 2017-06-27 10:37:10 
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-27 10:43:02
 */


const db = require('./db.js');
const Collection = require('./collection.js');

exports.db = db;

// 缓存collections
const collectionsMap = new Map();
exports.getCollection = function (name) {
  collectionsMap.has(name) || collectionsMap.set(name, new Collection(name));
  return collectionsMap.get(name);
};

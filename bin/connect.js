/*
* @Author: zoucong
* @Date:   2017-06-16 18:44:57
* @Last Modified by:   zoucong
* @Last Modified time: 2017-06-16 18:45:58
*/

'use strict';

const MongoClient = require('mongodb').MongoClient;
const { dbPath } = require('../config/');

module.exports = MongoClient.connect(dbPath);
/*
 * @Author: zoucong
 * @Date:   2017-06-16 15:24:30
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-26 15:20:25
 */

'use strict';

const config = {
  pageSize: 20,
  maxDBSize: 100,
  port: 3000,
};

const envConfig = process.env.NODE_ENV === 'production' ?
  require('./config.prod.js') :
  require('./config.dev.js');

module.exports = Object.assign(config, envConfig);

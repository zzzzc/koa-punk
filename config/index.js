/*
 * @Author: zoucong
 * @Date:   2017-06-16 15:24:30
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-23 13:49:53
 */

'use strict';

const config = {
  pageSize: 20,
  maxDBSize: 100,
};

const envConfig = process.env.NODE_ENV === 'production' ? 
  require('./config.prod.js') :
  require('./config.dev.js');

module.exports = Object.assign(config, envConfig);
  
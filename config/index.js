/*
* @Author: zoucong
* @Date:   2017-06-16 15:24:30
* @Last Modified by:   zoucong
* @Last Modified time: 2017-06-16 16:29:57
*/

'use strict';

module.exports = 
  process.env.NODE_ENV === 'production' ? 
    require('./config.prod.js') :
    require('./config.dev.js');
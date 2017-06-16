/*
* @Author: zoucong
* @Date:   2017-06-16 17:47:51
* @Last Modified by:   zoucong
* @Last Modified time: 2017-06-16 17:52:36
*/

'use strict';

exports.toNumber = function (data, defaultVal) {
  return isNaN(data) ? defaultVal : Number(data);
}
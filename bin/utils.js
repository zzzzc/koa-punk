/*
 * @Author: zoucong
 * @Date:   2017-06-16 17:47:51
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-23 13:50:49
 */

'use strict';

exports.toNumber = function (data, defaultVal) {
  return isNaN(data) ? defaultVal : Number(data);
}

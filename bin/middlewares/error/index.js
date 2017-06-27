/*
 * @Author: zoucong 
 * @Date: 2017-06-27 12:51:45 
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-27 14:32:45
 */


module.exports = async function (ctx, next) {
  try { await next() }
  catch (e) {
    console.log(e);
    ctx.status = 500;
  }
};

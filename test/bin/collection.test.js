/*
* @Author: zoucong
* @Date:   2017-06-16 16:31:55
* @Last Modified by:   zoucong
* @Last Modified time: 2017-06-16 17:08:16
*/

'use strict';
const expect = require ('chai').expect;
const Collection = require('../../bin/collection.js');

describe('db collection test',async function () {
  const collection = new Collection('test');

  await it('write/read/delete item', async function(){
    const data = {name:`张三${new Date().getTime()}`}
    // insert
    await collection.insert(data);
    // read
    const res = await collection.find(data);
    expect(res).is.a('array');
    expect(res.length).is.not.equal(0);
    expect(res[0].name).is.equal(data.name);
    // delete
    await collection.remove({_id: res[0]._id});
    const removed = await collection.find(data); 
    expect(removed.length).is.equal(0);
  });

});
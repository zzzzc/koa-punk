/*
 * @Author: zoucong
 * @Date:   2017-06-16 16:31:55
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-27 14:31:06
 */

'use strict';
const expect = require('chai').expect;
const { db, getCollection } = require('../../bin/db/');
const { ObjectID } = require('mongodb');

describe('test getCollection', function () {
  it('get twins return same', function () {
    const one = getCollection('abc');
    const two = getCollection('abc');
    expect(one).is.equal(two);
  });

  it('get diff', function () {
    const one = getCollection('abc');
    const two = getCollection('def');
    expect(one).is.not.equal(two);
  });
});

describe('database collection test', function () {
  const collectionName = 'testdb';
  const collection = getCollection(collectionName);
  const data = { name: `张三${new Date().getTime()}` };

  before(async function () {
    try { await collection.drop(); }
    catch (e) {};
  });

  after(async function () {
    await collection.drop();
  });

  describe('#insert()', function () {
    it('insert item', async function () {
      const res = await collection.insert(data);
      expect(res.result.ok).is.equal(1);
      expect(res.ops).is.an('array');
      expect(res.ops.length).is.equal(1);
      expect(res.ops[0]).is.contain(data);
    });

    it('insert many', async function () {
      const data = [{ name: 1 }, { name: 2 }];
      const res = await collection.insert(data);
      expect(res.result.ok).is.equal(1);
      expect(res.ops).is.an('array');
      expect(res.ops.length).is.equal(data.length);
    });
  });

  describe('#count()', function () {
    it('items count', async function () {
      const count = await collection.count();
      expect(count).is.a('number');
    });
  });

  describe('#find()', function () {
    it('find item', async function () {
      const res = await collection.find(data);
      expect(res).is.a('array');
      expect(res.length).is.equal(1);
      expect(res[0].name).is.equal(data.name);
    })
  });

  describe('#replace()', function () {
    it('replace item', async function () {
      const data = { name: 'abc' };
      const insert = await collection.insert(data);
      const query = { _id: insert.ops[0]._id };

      const res = await collection.replace(query, { age: 1 });
      expect(res.ok).is.equal(1);

      const res2 = await collection.find(query);
      expect(res2.length).is.equal(1);
      expect(res2[0].name).is.equal(undefined);
      expect(res2[0].age).is.equal(1);
    });
  });

  describe('#update()', function () {
    it('update item', async function () {
      const data = { name: 'abc' };
      const insert = await collection.insert(data);
      const query = { _id: insert.ops[0]._id };

      const res = await collection.update(query, { age: 1 });
      expect(res.ok).is.equal(1);

      const res2 = await collection.find(query);
      expect(res2.length).is.equal(1);
      expect(res2[0].name).is.equal(data.name);
      expect(res2[0].age).is.equal(1);
    });
  });

  describe('#delete()', function () {
    it('remove item', async function () {
      const res = await collection.delete(data);
      expect(res.ok).is.equal(1);

      const removed = await collection.find(data);
      expect(removed.length).is.equal(0);
    })
  });

  describe('#drop()', function () {
    it('drop collection', async function () {
      const res = await collection.drop();
      expect(res).is.equal(true);
      const collections = await db.listCollections();
      expect(collections.find(d => d.name === collectionName)).is.equal(undefined);
    });

    it('insert after drop', async function () {
      const insert = await collection.insert(data);
      expect(insert.result.ok).is.equal(1);
      const find = await collection.find(data);
      expect(find).is.a('array');
      expect(find.length).is.equal(1);
    });
  });
});

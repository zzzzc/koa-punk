/*
 * @Author: zoucong
 * @Date:   2017-06-16 16:31:55
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-26 16:38:13
 */

'use strict';
const expect = require('chai').expect;
const Collection = require('../../bin/collection.js');
const db = require('../../bin/db.js');
const { ObjectID } = require('mongodb');

describe('Collection test', function () {
  const collectionName = 'testdb';
  const collection = new Collection(collectionName);
  const data = { name: `张三${new Date().getTime()}` };

  before(async function () {
    try { await collection.drop(); }
    catch (e) { return };
  });

  describe('#insert()', function () {
    it('test insert', async function () {
      const res = await collection.insert(data);
      expect(res.result.ok).is.equal(1);
    });
  });

  describe('#count()', function () {
    it('items count', async function () {
      const count = await collection.count();
      expect(count).is.a('number');
      expect(count).is.equal(1);
    });
  });

  describe('#find()', function () {
    it('test find', async function () {
      const res = await collection.find(data);
      expect(res).is.a('array');
      expect(res.length).is.equal(1);
      expect(res[0].name).is.equal(data.name);
    })
  });

  describe('#remove()', function () {
    it('test remove', async function () {
      const res = await collection.remove(data);
      expect(res.result.ok).is.equal(1);

      const removed = await collection.find(data);
      expect(removed.length).is.equal(0);
    })
  });

  describe('#drop()', function () {
    it('test drop', async function () {
      const res = await collection.drop();
      expect(res).is.equal(true);

      const collections = await db.listCollections();
      expect(collections.find(d => d.name === collectionName)).is.equal(undefined);
    });
  });
});

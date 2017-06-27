/*
 * @Author: zoucong 
 * @Date: 2017-06-26 15:21:57 
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-27 15:21:11
 */

const axios = require('axios');
const expect = require('chai').expect;
const { port } = require('../../config');

const host = `http://localhost:${port}`;


function isOk(status) {
  expect(status).is.equal(200);
}

describe('/apilist test', function () {
  it('show collections', async function () {
    const { status, data: collections } = await axios.get(host + '/apilist');
    isOk(status);
    expect(collections).is.an('array');
    collections.forEach(d => expect(d).is.a('string'));
  })
})

describe('list methods', function () {
  const apiName = 'testlistapi';
  const url = `${host}/${apiName}`;

  before(async function () {
    try { await axios.delete(url); }
    catch (e) { }
  });

  after(async function () {
    await axios.delete(url);
  });

  describe('#POST', function () {
    it('creat item', async function () {
      const post = { name: 1 };
      const { data, status } = await axios.post(url, post);
      isOk(status);
      expect(data.ok).is.equal(1);
      expect(data.n).is.equal(1);
    });

    it('creat many', async function () {
      const post = [{ name: 1, name: 2, name: 3 }];
      const { data, status } = await axios.post(url, post);
      isOk(status);
      expect(data.result.n).is.equal(post.length);
    });
  });

  describe('#GET', function () {
    it('get list', async function () {
      const { data, status } = await axios.get(url);
      isOk(status);
      expect(data.total).is.an('number');
      expect(data.total).is.not.equal(0);
      expect(data.page).is.an('number');
      expect(data.pageSize).is.an('number');
      expect(data.data).is.an('array');
    });
  });

  describe('#DELETE', function () {
    it('remove collection', async function () {
      const { status } = await axios.delete(url);
      isOk(status);
      const { status: status2, data: data2 } = await axios.get(url);
      isOk(status2);
      expect(data2.total).is.equal(0);
    });

    it('creat after remove', async function () {
      const { status } = await axios.post(url, { name: 1 });
      isOk(status);
      const { status: status2, data: data2 } = await axios.get(url);
      isOk(status2);
      expect(data2.total).is.equal(1);
    });
  });
});


describe('item methods', function () {
  const apiName = 'testitemapi';
  const item = { name: 1 };
  const listUrl = `${host}/${apiName}/`;
  let url;

  before(async function () {
    try { await axios.delete(listUrl); } catch (e) { }// clear api
    await axios.post(listUrl, item);// creat test item
    const { data: res } = await axios.get(listUrl);// get id;
    url = listUrl + res.data[0]._id;
  });

  after(async function () {
    await axios.delete(listUrl);// clear api when test end
  });

  describe('#GET', function () {
    it('get item', async function () {
      const { data, status } = await axios.get(url);
      isOk(status);
      expect(data).is.include(item);
    });

    it('get not exist', async function () {
      await axios.get(listUrl + '11111')
        .catch(e => {
          const { status } = e.response;
          expect(status).is.equal(404);
        });
    });
  });

  describe('#PUT', function () {
    it('replace item', async function () {
      const param = { age: 1 }
      const { status, data } = await axios.put(url, param);
      isOk(status);
      delete data._id;
      expect(data).is.deep.equal(param);
    })
  });

  describe('#PATCH', function () {
    it('update item', async function () {
      const param = { name: 'foobar' };
      const { status, data } = await axios.patch(url, param);
      isOk(status);
      expect(data).is.include(param);
    });
  });

  describe('#DELETE', function () {
    it('delete item', async function () {
      const { data, status } = await axios.delete(url);
      isOk(status);
      expect(data).is.equal('ok');
    });
  });

});
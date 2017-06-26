/*
 * @Author: zoucong 
 * @Date: 2017-06-26 15:21:57 
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-26 18:53:56
 */

const axios = require('axios');
const expect = require('chai').expect;

const { port } = require('../../config');


function isOk(status) {
  expect(status).is.equal(200);
}

describe('list methods', function () {
  const apiName = 'testlistapi';
  const url = `http://localhost:${port}/${apiName}`;

  before(async function () {
    try { await axios.delete(url); }
    catch (e) { }
  });

  describe('#POST', function () {
    it('creat item', async function () {
      const post = { name: 1 };
      const { data, status } = await axios.post(url, post);
      isOk(status);
      expect(data.result.n).is.equal(1);
    });

    it('creat many', async function () {
      const post = [{ name: 1, name: 2, name: 3 }];
      const { data, status } = await axios.post(url, post);
      isOk(status);
      expect(data.result.n).is.equal(post.length);
    })
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
      const { data, status } = await axios.delete(url);
      isOk(status);
    });
  })
});


describe('item methods', function () {
  const apiName = 'testitemapi';
  const item = { name: 1 };
  const listUrl = `http://localhost:${port}/${apiName}/`;
  let url;

  before(async function () {
    try { axios.delete(listUrl); } catch (e) { }// clear api
    await axios.post(listUrl, item);// creat test item
    const { data: res } = await axios.get(listUrl);// get id;
    url = listUrl + res.data[0]._id;
    console.log('---------1');
  });

  after(async function () {
    axios.delete(listUrl);// clear api when test end
    console.log('---------4');
  });

  describe('#GET', function () {
    it('get item', async function () {
      console.log('---------2');
      const { data, status } = await axios.get(url);
      isOk(status);
      expect(data).is.include(item);
    });
  });

  describe('#DELETE', function () {
    it('delete item', async function () {
      console.log('---------3')
      // console.log(url);
      const { data, status } = await axios.delete(url);
      console.log(data);
      isOk(status);
      expect(data).is.equal('ok');
    });
  })

});
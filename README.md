# koa-punk
没啥卵用的RESTful API Server

## 简介
koa + mongodb构造的RESTful风格服务器，并附带一个API管理界面。基于mongodb api做了简单封装。对资源模型基本没有限制，也不需要描述，基本上前端插入啥后端就返回啥。个人用于构造一些简单的demo。

## 配置
创建好数据库，并在`/config/config.dev.js`（测试环境）和`config/config.prod.js`（生产环境）里配置好`dbPath`，开启mongodb服务。

## 使用
需要nodejs >= 7.0，`npm run dev`开启调试，`npm run prod`开启生产模式。

#### list api (url: `/${collectionName}`):

1. get : 获取资源列表
2. post {Array|Object} : 插入一组/一条资源
3. delete : 删除该资源集合

#### item api (url: `/${collectionName}/${id}`):

1. get : 获取该资源
2. put {Object} : 替换该资源
3. patch {Object} : 更新相关字段
4. delete : 删除改条资源

## //TODOS(Maybe)
1. 数据库引用
2. 文件上传功能
3. 用户权限系统



import dva from 'dva';
import {browserHistory, hashHistory} from 'dva/router'
import React from 'react'
import createLoading from 'dva-loading';
import {message} from 'antd';
import createReduxLogger from 'redux-logger'
import './index.html';
import './index.css';
import $$ from "./utils/appHelper";
import bottle from './utils/bottle'

// 给全局bottle注册相关依赖
// 给依赖注入容器添加appHelper服务
bottle.service('appHelper', ()=>$$);


const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  // 使用 browserHistory 或 hashHistory（默认）
  history: browserHistory,
  // 用于添加额外的redux applyMiddleware
  onAction: [
    createReduxLogger(),
  ],
  // 添加额外的reducer
  extraReducers: {},
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
    throw e;
  },
});
$$.registerApp(app);


// 2. Plugins
// 自动创建loading的state
app.use(createLoading());

// 3. Model
// model放到router中做按需加载了
// Moved to router.js
$$.registerModel(require('./models/routeInfo'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

window.React = React;

/*
 TODO
 - [x] 关闭了husky触发的lint代码检查（package.json中声明precommit）
 - [x] 定义XRouteUrl类[format，push，replace，setRoute]
 - [x] effects中的多个异步请求的处理，put无法按步骤执行，只能用call，将所有异步请求放在一个新建action effect函数里
 - [x] fetch的封装
 - [x] 翻页与url的同步问题(同步url的dispatch action)
 - [x] 添加了redux-logger
 - [x] select的用法：异步读取顶层state数据
 - [x] Promise封装（将普通函数在effects中使用）
 - [x] js的依赖注入实现（将XRouteUrl的依赖降到最低）
 - [ ] 改造联房科技代码
 - [ ] ticket注入全局ajax
 */

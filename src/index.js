import dva from 'dva';
import {browserHistory, hashHistory} from 'dva/router'
import React from 'react'
import createLoading from 'dva-loading';
import {message} from 'antd';

import './index.html';
import './index.css';
import $$ from "./utils/appHelper";


const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  // 使用 browserHistory 或 hashHistory（默认）
  history: browserHistory,
  // 用于添加额外的redux applyMiddleware
  onAction: [],
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
 1. 关闭了husky触发的lint代码检查（package.json中声明precommit）
 2. ~~定义XRouteUrl类[format，push，replace，setRoute]~~
 3. dispatch action后，触发多个effect，异步的 chain 调用
 4. fetch的封装
 5. 翻页与url的同步问题
 6. routes改成<Route />方式定义
 7. onEnter不触发
 8. usersMeta.ACTION_TYPES.reload查看effects里select的用法
 9. 同步url的dispatch action
 */

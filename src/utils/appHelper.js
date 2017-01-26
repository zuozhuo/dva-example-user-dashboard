/**
 * Created by zuozhuo on 2017/1/25.
 */
'use strict'
import {routerRedux} from 'dva/router'

// ----------------------------------------------------
let _dvaApp = null;
function registerApp(dvaApp) {
  window._dvaApp = _dvaApp = dvaApp;
  _dvaApp.routerRedux = routerRedux;
}
// 获取dvaApp对象
function getApp() {
  if (!_dvaApp) {
    throw new Error('请在const app = dva(); 之后 registerApp(app);');
  }
  return _dvaApp;
}
const _cachedRegisterModel = {};
// 用于在按需加载的路由中注册model，每个路由根据自己需要注册自己的model
function registerModel(model) {
  if (!_cachedRegisterModel[model.namespace]) {
    getApp().model(model);
    _cachedRegisterModel[model.namespace] = 1;
  }
}
// 获取顶层store对象
function getStore() {
  return getApp()._store;
}
// 获取全局store.dispatch方法
function dispatch() {
  const _store = getStore();
  return _store.dispatch.apply(_store, arguments);
}
// 获取顶层state
function getState() {
  return getStore().getState();
}


//----------------------------------------------------
// 获取路由信息 (返回 models/routeInfo 的state信息)
function getRouteInfo() {
  // {location: Object, params: Object}
  return getState().routeInfo;
}
function getRouteParams() {
  return getRouteInfo().params;
}
function getLocation() {
  return getRouteInfo().location;
}

// 获取history对象(enhancedHistory)，用于push、replace url
function getHistory() {
  // 该history为 react-router-redux 组件 syncHistoryWithStore 封装dva({history})后的 enhancedHistory
  // 等同于每个Page页面的props.history
  return getApp()._history;
}
function pushToUrl(url) {
  /* routerRedux方式的push
   dispatch(routerRedux.push({
   pathname: '/users/2',
   query: { page },
   }));
   */
  getHistory().push(url); // 跳转页面
}
function replaceToUrl(url) {
  getHistory().replace(url);
}

// ----------------------------------------------------
function createActionTypes(ACTION_TYPES) {
  // 修正键值对为相同字符串
  for (let prop in ACTION_TYPES) {
    if (ACTION_TYPES.hasOwnProperty(prop)) {
      ACTION_TYPES[prop] = prop;
    }
  }
  return ACTION_TYPES;
}
function createAction(type, payload) {
  return {
    type,
    payload,
  };
}
function putAction(put, type, payload) {
  // 貌似不能用全局的put，只能讲model上effects的put传进来
  // import {call, put} from 'redux-saga/effects'
  if (typeof put !== 'function') {
    throw new Error('请将effects中的put作为第一个参数传入！')
  }
  const actionJson = createAction(type, payload);
  return put(actionJson);
}
function createActionWithNamespace(namespace) {
  return function (type, payload) {
    type = namespace ? `${namespace}/${type}` : type;
    return createAction(type, payload);
  }
}

function createModelActionMethods(namespace) {
  const modelCreateAction = createActionWithNamespace(namespace);

  const modelDispatchAction = function (type, payload) {
    return dispatch(modelCreateAction(type, payload));
  };

  return {
    createAction: modelCreateAction,
    dispatchAction: modelDispatchAction,
    putAction: putAction,
  }
}

export default {
  registerModel,
  registerApp, getApp,
  getState, getStore, getRouteInfo, getLocation, getRouteParams,
  getHistory, dispatch,
  pushToUrl, replaceToUrl,
  createActionTypes, createAction, createActionWithNamespace, createModelActionMethods,
}

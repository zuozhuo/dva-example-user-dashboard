/**
 * Created by zuozhuo on 2017/1/26.
 */
'use strict'

/**
 * Created by zuozhuo on 16/10/18.
 */
"use strict";
// 注意！！！！ 为了避免循环引用，这里的import必须纯净，其import的外部包的import也必须纯净，例如appHelper
import React from 'react'
import querystring from 'querystring'
import {Route, formatPattern, browserHistory} from 'react-router'
import $$ from './appHelper'


function isUrlAbsolute(url) {
  if (typeof url === 'string') {
    return /^[a-z][a-z0-9+.-]*:/.test(url);
  }
  return false;
}


let routeKey = 0;
class XRouteUrl {

  constructor(pathPattern) {
    this.pathPattern = pathPattern;
  }

  getPathPattern() {
    return this.pathPattern;
  }

  // 用于传递给react-route声明用
  getRoute() {
    return this.route;
  }

  setRoute(component, getLazyComponent, props = {}) {
    if (!component && !getLazyComponent) {
      return;
    }
    if (isUrlAbsolute(this.getPathPattern())) {
      return;
    }
    const onEnter = function () {
      // 这里可以加一些全局的onEnter逻辑，例如该url应该是loginRequired
      if (typeof props.onEnter === 'function') {
        props.onEnter.apply(this, arguments);
      }
    };
    routeKey++;
    const routeProps = {
      key: routeKey,
      ...props,
      path: this.getPathPattern(),
      onEnter,
    };
    // 异步加载路由
    if (getLazyComponent) {
      routeProps.getComponent = getLazyComponent;
    } else {
      routeProps.component = component;
    }
    this.route = <Route {...routeProps}/>;
    return this.route;
  }

  // 用于将路由pattern转成原始string
  formatUrl(pathParams = {}, queryParams) {

    // 如果是绝对路径的url，例如第三方的url，那么原样返回
    if (isUrlAbsolute(this.getPathPattern())) {
      return this.getPathPattern();
    }
    let url = formatPattern(this.getPathPattern(), pathParams);
    if (queryParams && typeof queryParams === 'object') {
      url += `?${querystring.stringify(queryParams)}`
    }
    return url;
  }

  pushMe(pathParams = {}, queryParams) {
    let url = this.formatUrl.apply(this, arguments);
    $$.pushToUrl(url);
  }

  replaceMe(pathParams = {}, queryParams) {
    let url = this.formatUrl.apply(this, arguments);
    $$.replaceToUrl(url);
  }
}


function getRoutesFromUrls(allUrls) {
  const routes = [];
  Object.keys(allUrls).forEach(key=> {
    const routeUrl = allUrls[key];
    if (routeUrl && (routeUrl instanceof XRouteUrl)) {
      const theRoute = routeUrl.getRoute();
      theRoute && (routes.push(theRoute));
    }
  });
  return routes;
}


export {
  XRouteUrl,
  isUrlAbsolute,
  getRoutesFromUrls,
}


/**
 * Created by zuozhuo on 2017/2/5.
 */
"use strict";
import fetch from 'dva/fetch';
import querystring from 'querystring';
import $$ from "./appHelper";

function requestGlobalConfig(url, options = {}) {
  // 这里可以做一些全局的ajax请求配置
  url = $$.addUrlQuery(url, {
    lhotelGroupCode: window.lhotelGroupCode,
    ticket: sessionStorage.ticket,
    ark_version: '1.0.0',
  });

  // 全局ajax添加头
  options.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Request-Client-Name': 'ark-admin-api-request',
    ...options.headers,
  };

  return {
    url,
    options,
  }
}

function createBodyString(data) {
  // 以JSON形式提交
  const bodyString = typeof data === 'string' ? data : JSON.stringify(data);
  // 以formData（querystring）形式提交
  // const bodyString = querystring.stringify(data);

  return bodyString;
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  const globalConfig = requestGlobalConfig(url, options);
  return fetch(globalConfig.url, globalConfig.options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({data}))
    .catch((err) => ({err}));
}

async function GET(url, query = {}, options) {
  const urlWithQuery = $$.addUrlQuery(url, query);

  return await request(urlWithQuery, {
    method: 'GET',
    ...options,
  });
}

async function DELETE(url, query = {}, options) {
  const urlWithQuery = $$.addUrlQuery(url, query);

  return await  request(urlWithQuery, {
    method: 'DELETE',
    ...options,
  });
}

async function POST(url, data = {}, options) {

  return await  request(url, {
    method: 'POST',
    body: createBodyString(data),
    ...options,
  })
}

async function PATCH(url, data = {}, options) {

  return await request(url, {
    method: 'PATCH',
    body: createBodyString(data),
    ...options,
  })
}

async function PUT(url, data = {}, options) {

  return await request(url, {
    method: 'PUT',
    body: createBodyString(data),
    ...options,
  })
}

export {
  request,
  GET,
  POST,
  DELETE,
  PATCH,
  PUT,
}

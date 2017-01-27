"use strict";
import fetch from 'dva/fetch';
import querystring from 'querystring';
import $$ from "./appHelper";

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
export async function request(url, options) {
  const response = await fetch(url, options);

  checkStatus(response);

  const data = await response.json();

  const ret = {
    data,
    headers: {},
  };

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }

  return ret;
}

export async function GET(url, query = {}, options) {
  const urlWithQuery = $$.addUrlQuery(url, query);

  return await request(urlWithQuery, {
    method: 'GET',
    ...options,
  });
}

export async function POST(url, data = {}, options) {

  return await  request(url, {
    method: 'POST',
    body: createBodyString(data),
    ...options,
  })
}

export async function DELETE(url, query = {}, options) {
  const urlWithQuery = $$.addUrlQuery(url, query);

  return await  request(urlWithQuery, {
    method: 'DELETE',
    ...options,
  });
}

export async function PATCH(url, data = {}, options) {

  return await request(url, {
    method: 'PATCH',
    body: createBodyString(data),
    ...options,
  })
}


function createBodyString(data) {
  // 以JSON形式提交
  const bodyString = typeof data === 'string' ? data : JSON.stringify(data);
  // 以formData（querystring）形式提交
  // const bodyString = querystring.stringify(data);

  return bodyString;
}

"use strict";
import * as usersService from '../services/users';
import * as usersMeta from './users.meta'
import $$ from "../utils/appHelper";

export default {
  namespace: usersMeta.NAMESPACE,
  state: {
    list: [],
    total: null,
    page: null,
  },
  // pure function called by action
  // (state,action) => newState
  reducers: {
    [usersMeta.ACTION_TYPES.save](state, {payload: {data: list, total, page}}) {
      return {...state, list, total, page};
    },
  },
  // methods triggered by action
  effects: {
    *[usersMeta.ACTION_TYPES.fetch]({payload: {page = 1, test}}, {call, put}) {
      yield call($$.delay, 2000);
      const {data, headers} = yield call(usersService.fetch, {page, test});

      const r1 = yield usersMeta.putAction(put, usersMeta.ACTION_TYPES.save, {
        data,
        total: parseInt(headers['x-total-count'], 10),
        page: parseInt(page, 10),
      });
      // const r2 = yield usersMeta.dispatchAction(usersMeta.ACTION_TYPES.save, {
      //   data,
      //   total: parseInt(headers['x-total-count'], 10),
      //   page: parseInt(page, 10),
      // });
      console.log('yield put r1: ', r1,);
      // console.log('yield put r2: ', r2);
    },
    *[usersMeta.ACTION_TYPES.remove]({payload: id}, {select, call, put}) {
      yield call(usersService.remove, id);
      // yield usersMeta.putAction(put, usersMeta.ACTION_TYPES.reload);

      const page = yield select(state => state.users.page);
      console.log('page: ', page);
      const r3 = yield usersMeta.putAction(put, usersMeta.ACTION_TYPES.fetch, {page, test: 'hahahahhaaaa'});
      const r33 = yield usersMeta.putAction(put, usersMeta.ACTION_TYPES.fetch, {page, test: 'ooooooooooo'});
      console.log('r3: ', r3, r33);
      // const r4 = yield usersMeta.dispatchAction(usersMeta.ACTION_TYPES.fetch, {page, test: '99999999'});
      // const r5 = yield usersMeta.dispatchAction(usersMeta.ACTION_TYPES.fetch, {page, test: '00000000'});
      // console.log('r4 r5: ', r4, r5);


    },
    *[usersMeta.ACTION_TYPES.patch]({payload: {id, values}}, {call, put}) {
      yield call(usersService.patch, id, values);
      yield usersMeta.putAction(put, usersMeta.ACTION_TYPES.reload);
    },
    *[usersMeta.ACTION_TYPES.create]({payload: values}, {call, put}) {
      yield call(usersService.create, values);
      yield usersMeta.putAction(put, usersMeta.ACTION_TYPES.reload);
    },
    *[usersMeta.ACTION_TYPES.reload](action, {put, select}) {
      // select用于异步读取顶层state的一些数据
      const page = yield select(state => state.users.page);
      yield usersMeta.putAction(put, usersMeta.ACTION_TYPES.fetch, {page});
    },
  },
  subscriptions: {
    // 不再这里加载初始数据，代码比较恶心
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname, query }) => {
    //     if (pathname === '/users/1') {
    //       dispatch({ type: 'fetch', payload: query });
    //     }
    //   });
    // },
  },
};

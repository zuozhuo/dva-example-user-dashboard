"use strict";
import * as usersService from '../services/users';
import * as usersMeta from './users.meta'

export default {
  namespace: usersMeta.NAMESPACE,
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, {payload: {data: list, total, page}}) {
      return {...state, list, total, page};
    },
    fetch(state, action){
      console.log(action);
      return state;
    }
  },
  effects: {
    *fetch({payload: {page = 1, test}}, {call, put}) {
      const {data, headers} = yield call(usersService.fetch, {page, test});
      yield usersMeta.putAction(put, usersMeta.ACTION_TYPES.save, {
        data,
        total: parseInt(headers['x-total-count'], 10),
        page: parseInt(page, 10),
      });
    },
    *remove({payload: id}, {call, put}) {
      yield call(usersService.remove, id);
      yield put({type: 'reload'});
    },
    *patch({payload: {id, values}}, {call, put}) {
      yield call(usersService.patch, id, values);
      yield put({type: 'reload'});
    },
    *create({payload: values}, {call, put}) {
      yield call(usersService.create, values);
      yield put({type: 'reload'});
    },
    *reload(action, {put, select}) {
      const page = yield select(state => state.users.page);
      yield put({type: 'fetch', payload: {page}});
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

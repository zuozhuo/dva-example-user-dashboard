"use strict";

import matchRoutes from 'react-router/lib/matchRoutes'

const NAMESPACE = 'routeInfo';
const ACTION_TYPES = {
  "setRouteInfo": "setRouteInfo"
};


export default {
  namespace: NAMESPACE,
  state: {
    // 获取路由的location对象，可以访问query参数：location.query
    // 等同于每个Page页面的props.location
    location: {},
    // 获取路由的path参数
    // 等同于每个Page页面的props.params
    params: {},
  },
  reducers: {
    [ACTION_TYPES.setRouteInfo](state, {type, payload:{location, params}}) {
      return {
        ...state,
        location,
        params,
      };
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      const routes = require('../routesSet');
      return history.listen(location => {

        matchRoutes(routes, location, (error, state) => {
          if (!error) {
            const params = state ? state.params : {};

            // 分发location和params信息到全局state上
            dispatch({
              type: ACTION_TYPES.setRouteInfo,
              payload: {
                location: location,
                params: params
              }
            });

            // 调用初始数据加载函数onInitialLoad
            // 为什么不用onEnter，因为onEnter无法再同一个组件内部切换时触发，例如?page=xxx翻页的情况
            state.routes.forEach(r=> {
              if (r.onInitialLoad) {
                r.onInitialLoad.call(r, location, params);
              }
            });

          }
        })
      });

    },
  },
};

import matchRoutes from 'react-router/lib/matchRoutes'

const NAMESPACE = 'routeInfo';
const ACTION_TYPES = {
  "setRoute": "setRoute"
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
    [ACTION_TYPES.setRoute](state, {type, payload:{location, params}}) {
      return {
        ...state,
        location,
        params,
      };
    },
  },
  subscriptions: {
    setup({dispatch, history}) {

      return history.listen(location => {

        matchRoutes(require('../routesList'), location, (error, state) => {
          if (!error) {
            dispatch({
              type: ACTION_TYPES.setRoute,
              payload: {
                location: location,
                params: state ? state.params : {}
              }
            })
          }
        })
      });

    },
  },
};

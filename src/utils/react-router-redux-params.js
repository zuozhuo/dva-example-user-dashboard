/**
 * Created by zuozhuo on 2017/1/26.
 */
'use strict'

import matchRoutes from 'react-router/lib/matchRoutes'
import { createRoutes } from 'react-router'
export const UPDATE_LOCATION_WITH_PARAMS = "@@router/UPDATE_LOCATION_WITH_PARAMS"
export * from 'react-router-redux'

const initialState = {
  location: undefined,
  params: {}
}

export function syncParams(store, routes, history) {
  const routesArray = createRoutes(routes)
  return history.listen(location => {
    matchRoutes(routesArray, location, (error, state) => {
      if (!error) {
        store.dispatch({
          type: UPDATE_LOCATION_WITH_PARAMS,
          payload: {
            location: location,
            params: state ? state.params : {}
          }
        })
      }
    })
  })
}

export function routeParamsReducer(state = initialState, { type, payload }) {
  if (type === UPDATE_LOCATION_WITH_PARAMS) {
    return {
      ...state,
      location: payload.location,
      params: payload.params
    }
  }
  return state
}

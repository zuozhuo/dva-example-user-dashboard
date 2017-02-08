"use strict";

import React from 'react';
import {Router, Route, applyRouterMiddleware,} from 'dva/router';
import routes from './routesSet'
import './routesInitialLoad'

const useExtraProps = {
  renderRouteComponent: (child, props) => {

    // 可以给所有render的页面追加一些全局props
    const extraProps = {app_version: '1.0.0'};
    return React.cloneElement(child, extraProps);
    // return child;
  }
};

function handleRouteUpdate(){
  console.log(arguments);
}

export default ({history, app})=> (
  <Router history={history}
          routes={routes}
          onUpdate={handleRouteUpdate}
          render={applyRouterMiddleware(useExtraProps)}/>
);

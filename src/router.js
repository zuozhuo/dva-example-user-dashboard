"use strict";

import React from 'react';
import {Router, applyRouterMiddleware,} from 'dva/router';
import routes from './routesMap'
// import {registerModel} from "./utils";


const useExtraProps = {
  renderRouteComponent: (child, props) => {

    // 可以给所有render的页面追加一些全局props
    const extraProps = { app_version:'1.0.0' };
    return React.cloneElement(child, extraProps);
    // return child;
  }
};


function RouterConfig({ history, app }) {

  const routerInstance = (
    <Router history={history}
            routes={routes}
            render={applyRouterMiddleware(useExtraProps)}/>
  );
  return routerInstance;
}

export default RouterConfig;

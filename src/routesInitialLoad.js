/**
 * Created by zuozhuo on 2017/2/8.
 */
'use strict'

import * as allUrls from './urls';
import * as usersMeta  from "./models/users.meta";
import $$ from "./utils/appHelper";


allUrls.urlPageUsers.setInitialLoad(function () {

  require.ensure([], (require) => {

    // 按需加载page所需的model
    $$.registerModel(require('./models/users'));

    const {location, params} = $$.getRouteInfo();

    console.log('onInitialLoad');
    console.log(this);
    console.log(location);
    console.log(params);
    console.log('onInitialLoad');

    usersMeta.dispatchAction(usersMeta.ACTION_TYPES.fetch, {test: params.uid, page: location.query.page || 1});

  });

});

allUrls.urlPageIndex.setInitialLoad(function (location, params) {
  console.log('onInitialLoad');
  console.log(this);
  console.log(location);
  console.log(params);
  console.log('onInitialLoad');

});

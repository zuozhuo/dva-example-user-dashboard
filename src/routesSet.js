/**
 * Created by zuozhuo on 2017/1/25.
 */
'use strict'
import $$ from './utils/appHelper'
import {getRoutesFromUrls} from './utils/XRouteUrl'
import * as allUrls from './urls';

// http://react-guide.github.io/react-router-cn/docs/API.html#route

allUrls.urlPageIndex.setRoute(null, (nextState, cb)=>{
  require.ensure([], (require) => {
    // 按需加载page
    cb(null, require('./routes/PageIndex/PageIndex'));
  });
},{onEnter:()=>console.log('******** onEnter urlPageIndex *******')});
// allUrls.urlPageIndex.setRoute(require('./routes/PageIndex/PageIndex'));

allUrls.urlPageUsers.setRoute(null, (nextState, cb)=> {
  require.ensure([], (require) => {
    // 按需加载page
    cb(null, require('./routes/PageUsers/PageUsers'));
  });
},{onEnter:()=>console.log('******** onEnter urlPageUsers *******')});

// TODO onEnter貌似无法在首次刷新后触发，所以，还是在Page组件的ComponentDidMount里做吧


export default getRoutesFromUrls(allUrls);

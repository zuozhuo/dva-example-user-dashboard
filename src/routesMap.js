/**
 * Created by zuozhuo on 2017/1/25.
 */
'use strict'
import $$ from './utils/appHelper'

const routes = [
  {
    path: '/',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        // 按需加载page
        cb(null, require('./routes/PageIndex/PageIndex'));
      });
    },
  },
  {
    path: '/users/:uid',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        // 按需加载page所需的model
        $$.registerModel(require('./models/users'));
        // 按需加载page
        cb(null, require('./routes/PageUsers/PageUsers'));
      });
    },
  },
];


export default routes;

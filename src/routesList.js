/**
 * Created by zuozhuo on 2017/1/25.
 */
'use strict'
import $$ from './utils/appHelper'

// http://react-guide.github.io/react-router-cn/docs/API.html#route
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
    onEnter(){
      // onEnter貌似无法在首次刷新后触发，所以，还是在Page组件的ComponentDidMount里做吧
      console.log('【【【【【【【route onEnter')
    }
  },
];


export default routes;

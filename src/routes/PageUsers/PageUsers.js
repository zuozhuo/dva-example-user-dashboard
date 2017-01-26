import React from 'react';
import {connect} from 'dva';
import styles from './PageUsers.css';
import UsersComponent from '../../components/Users/Users';
import MainLayout from '../../components/MainLayout/MainLayout';
import $$ from "../../utils/appHelper";
import * as usersMeta  from "../../models/users.meta";

class PageUsers extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {location, params} = $$.getRouteInfo();

    usersMeta.dispatchAction(usersMeta.ACTION_TYPES.fetch, {test: params.uid});
  }

  render() {

    const {location, params} = $$.getRouteInfo();



    return (
      <MainLayout location={location}>
        <div className={styles.normal}>
          <p>uid={params.uid}; location.query={JSON.stringify(location.query)}</p>
          <UsersComponent />
        </div>
      </MainLayout>
    )
  }

}

// 不连接redux
// export default PageUsers;

// 连接redux
export default connect(({users})=>({users}))(PageUsers);

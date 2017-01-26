import React from 'react';
import {connect} from 'dva';
import styles from './PageUsers.css';
import UsersComponent from '../../components/Users/Users';
import MainLayout from '../../components/MainLayout/MainLayout';
import $$ from "../../utils/appHelper";


class PageUsers extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {

    const {location, params} = $$.getRouteInfo();
    console.log(location,params);


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
export default connect(({users, users2, routing, routing0})=>({users, users2, routing, routing0}))(PageUsers);

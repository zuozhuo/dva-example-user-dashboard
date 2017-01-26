import React from 'react';
import {connect} from 'dva';
import styles from './PageIndex.css';
import MainLayout from '../../components/MainLayout/MainLayout';
import $$ from "../../utils/appHelper";

function PageIndex() {
  const {location, params} = $$.getRouteInfo();


  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <p>uid={params.uid}; location.query={JSON.stringify(location.query)}</p>

        <div className={styles.welcome}/>
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a>
          </li>
        </ul>
      </div>
    </MainLayout>
  );
}

PageIndex.propTypes = {};

export default connect()(PageIndex);

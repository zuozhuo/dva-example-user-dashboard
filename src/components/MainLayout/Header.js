import React from 'react';
import { Menu, Icon, } from 'antd';
import { Link } from 'dva/router';
import $$ from "../../utils/appHelper";
import * as allUrls from "../../urls";


function Header({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key={allUrls.urlPageUsers.formatUrl({uid:2000})}>
        <Link to={allUrls.urlPageUsers.formatUrl({uid:2000},{hello:222,world:333})} ><Icon type="bars" />Users</Link>
      </Menu.Item>
      <Menu.Item key={allUrls.urlPageUsers.formatUrl({uid:1999})}>
        <div onClick={()=>allUrls.urlPageUsers.pushMe({uid:1999},{'very':'good'})}>
          <Icon type="bars" />Users2
        </div>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to={allUrls.urlPageIndex.formatUrl()}><Icon type="home" />Home</Link>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/page-you-dont-know"><Icon type="frown-circle" />404</Link>
      </Menu.Item>
      <Menu.Item key="/antd">
        <a href="https://github.com/dvajs/dva">dva</a>
      </Menu.Item>
    </Menu>
  );
}

export default Header;

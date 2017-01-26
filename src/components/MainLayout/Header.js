import React from 'react';
import { Menu, Icon, } from 'antd';
import { Link } from 'dva/router';
import $$ from "../../utils/appHelper";

function Header({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/users/1">
        <Link to="/users/1?hello=222&world=3333"><Icon type="bars" />Users</Link>
      </Menu.Item>
      <Menu.Item key="/users/3">
        <div onClick={()=>$$.pushToUrl('/users/3')}><Icon type="bars" />Users2</div>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/"><Icon type="home" />Home</Link>
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

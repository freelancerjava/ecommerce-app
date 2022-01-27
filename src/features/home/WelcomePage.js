import React, { Children, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

export default function WelcomePage({ children }) {
  const [current, setcurrent] = useState('products');
  const handleClick = e => {
    console.log('click ', e);
    setcurrent(e.key)
  };
  return (
    <div className="home-welcome-page">
      <header className="app-header">
        <img src={require('../../images/rekit-react.png')} className="rekit-logo" alt="logo" />
        <h1 className="app-title">Welcome to Online Store</h1>
      </header>
      <div className="app-intro">
        <div className="nav-menu">
          <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="products" icon={<MailOutlined />}>
              <Link to="/">Products</Link>
            </Menu.Item>
            <Menu.Item key="search" icon={<MailOutlined />}>
              <Link to="/search">Search products</Link>
            </Menu.Item>
          </Menu>
        </div>
        {children}
      </div>
    </div>
  );
}

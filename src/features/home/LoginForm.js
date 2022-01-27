import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { beginGetToken, successGetToken, failGetToken } from './redux/getTokenSlice';



const LoginForm = () => {

  const token = useSelector(state => state.home.token)
  const fetchTokenPending = useSelector(state => state.home.fetchTokenPending)
  const fetchTokenError = useSelector(state => state.home.fetchTokenError)
  const dispatch = useDispatch()

  const onFinish = values => {
    console.log('Received values of form: ', values);

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("_username", values.username);
    urlencoded.append("_password", values.password);
    urlencoded.append("_subdomain", values.subdomain);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    dispatch(beginGetToken(requestOptions))

    fetch("https://toko.ox-sys.com/security/auth_check", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.code && result.code == 401) {
          dispatch(failGetToken(result));
        } else {
          dispatch(successGetToken(result.token));
        }
      })
      .catch(error => {
        console.log('error', error)
        dispatch(failGetToken(error));
      });


  };

  return (
    <div className="home-login-form">
      {token}
      <Spin tip="Loading..." spinning={fetchTokenPending}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
            username: 'user_task',
            password: 'user_task',
            subdomain: 'toko',
          }}
          onFinish={onFinish}
        >
          <h1>Login</h1>
          {fetchTokenError && <h3 className={"error"}>{JSON.stringify(fetchTokenError.message)}</h3>}
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="subdomain"
            rules={[
              {
                required: true,
                message: 'Please input your Subdomain!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Subdomain"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
        </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};


LoginForm.propTypes = {};
LoginForm.defaultProps = {};

export default LoginForm

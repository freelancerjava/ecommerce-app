import React from 'react';
import LoginForm from './LoginForm';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function App({ children }) {

  const token = useSelector(state => state.home.token);

  if (!token) {
    return <LoginForm />
  }
  return (
    <div className="home-app">
      <div className="page-container">{children}</div>
    </div>
  );
}

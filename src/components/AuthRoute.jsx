import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCheck } from '../apis/user.api';

export default function AuthRoute() {
  const { useEffect } = React;
  const token = localStorage.getItem('token');

  useEffect(() => {
    getCheck();
  }, []);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

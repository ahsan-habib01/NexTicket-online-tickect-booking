import React, { useRef } from 'react';
import { Navigate, useLocation } from 'react-router';
import Loading from './../Components/Loading/Loading';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const hasShownToast = useRef(false);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    if (!hasShownToast.current) {
      toast.error('Please login to continue..');
      hasShownToast.current = true;
    }

    return <Navigate to={'/auth/login'} state={location?.pathname}></Navigate>;
  }

  return children;
};

export default PrivateRoute;

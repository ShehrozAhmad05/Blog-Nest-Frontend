import React, { useEffect, useState } from 'react';
import { checkAuthStatusAPI } from '../../APIServices/users/usersAPI';
import { Navigate } from 'react-router-dom';
import AuthCheckingComponent from './AuthCheckingComponent';

const AuthRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (!token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        const res = await checkAuthStatusAPI(token);
        console.log("Auth Response:", res);

        if (res?.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auth Check Failed:", err);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  // While checking authentication
  if (isLoading) return <AuthCheckingComponent />;

  // If user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated
  return children;
};

export default AuthRoute;

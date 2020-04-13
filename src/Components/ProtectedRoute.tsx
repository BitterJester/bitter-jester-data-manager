import React from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
import { Redirect } from 'react-router';

export interface ProtectedRouteProps {
  isAuthenticated: boolean;
  path: string;
  component: any;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
  const { component, path, isAuthenticated } = props;
  console.log(`asdf: ${isAuthenticated}`);
  return (
    <Route path={path}>
      {!isAuthenticated ? <Redirect to='/'/> : component}
    </Route>
  );
};

export default ProtectedRoute;
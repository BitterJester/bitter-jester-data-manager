import React from 'react';
import { BrowserRouter as Route } from 'react-router-dom';

export interface ProtectedRouteProps {
  isAuthenticated: boolean;
  path: string;
  component: any;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
  const { component, path, isAuthenticated } = props;
  console.log(`isAuth: in route:  ${isAuthenticated}`);
  return (
    <Route path={path}>
      {!isAuthenticated ? component : component}
    </Route>
  );
};

export default ProtectedRoute;
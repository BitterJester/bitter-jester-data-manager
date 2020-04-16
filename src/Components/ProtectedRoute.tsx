import React from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
import { RouteComponentProps, withRouter, Redirect } from 'react-router';

export interface ProtectedRouteProps extends RouteComponentProps<any> {
  isAuthenticated: boolean;
  path: string;
  component: any;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
  const { component, path, isAuthenticated } = props;
  
  
  return (
    <Route path={path}>
      {!isAuthenticated ? <Redirect push to='/login'/> : component}
    </Route>
  );
};

export default withRouter(ProtectedRoute);
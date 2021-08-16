import React from 'react';
import {BrowserRouter as Route} from 'react-router-dom';
import {RouteComponentProps, withRouter, Redirect} from 'react-router';
import {withAuthenticator} from "@aws-amplify/ui-react";

export interface ProtectedRouteProps extends RouteComponentProps<any> {
    path: string;
    component: any;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
    const {component, path} = props;


    return (
        <Route path={path}>
            <div>
                {component}
            </div>
        </Route>
    );
};

export default withRouter(ProtectedRoute);
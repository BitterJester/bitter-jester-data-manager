import React from 'react';
import { BrowserRouter as Redirect, Route } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';

type Props = {
    path: string;
    component: React.ReactElement;
}

const ProtectedRoute = (props: Props) => {
    const { path, component } = props;
    const { isAuthenticated } = useAuth0();

    return (
        <Route path={path} 
            render={props => (
            isAuthenticated ?
                component :
                <Redirect to='/' />
        )}
        />
    )
};

export default ProtectedRoute;
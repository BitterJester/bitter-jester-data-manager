import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './static/css/sidebar.css';
import Sidebar from './Components/Sidebar/Sidebar';
import './App.scss';
import {Col, Row} from "reactstrap";
import HomePage from "./pages/HomePage";
import {ROUTES} from "./static/constants/routes";
import Amplify from 'aws-amplify';
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import {AuthState, onAuthUIStateChange} from '@aws-amplify/ui-components';
import dataManagerReduxStore, {DataManagerReduxStore} from "./redux/data-manager-redux-store";
import {useSelector} from "react-redux";

Amplify.configure({
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
});

function App() {
    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData: { signInUserSession: any, attributes: any }) => {
            dataManagerReduxStore.dispatch({
                type: 'signInUserSession/set',
                payload: {authData, authState: nextAuthState},
            });
        });
    }, []);
    const {authState, signInUserSession} = useSelector((state: DataManagerReduxStore) => state.signInUserSession);
    const toRoute = (route, index) => {
        const routeInfo = ROUTES[route];
        const RoutePageComponent = routeInfo.component;
        return <Route
            key={`route-${index}`}
            path={routeInfo.route}>
            {<RoutePageComponent />}
        </Route>;
    };

    return (authState === AuthState.SignedIn && signInUserSession ?
            <Router>
                <Row style={{minHeight: '100vh'}}>
                    <Sidebar/>
                    <Col className={'main-content'}>
                        <Switch>
                            <Route exact path='/'>
                                <HomePage/>
                            </Route>
                            {
                                Object.keys(ROUTES).map(toRoute)
                            }
                        </Switch>
                    </Col>
                </Row>
            </Router> : <AmplifyAuthenticator/>
    );
}

export default (App);

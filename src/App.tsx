import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './static/css/sidebar.css';
import {useAuth0} from './react-auth0-spa';
import ProtectedRoute from './Components/ProtectedRoute';
import Sidebar from './Components/Sidebar/Sidebar';
import './App.scss';
import {Col, Row} from "reactstrap";
import HomePage from "./pages/HomePage";
import {ROUTES} from "./static/constants/routes";

function App() {
    const {isAuthenticated, isInitializing} = useAuth0();

    if (isInitializing) {
        return null;
    }

    const toProtectedRoute = (route, index) => {
        const routeInfo = ROUTES[route];
        const RoutePageComponentDefinition = routeInfo.component;
        return <ProtectedRoute
            key={`route-${index}`}
            isAuthenticated={isAuthenticated}
            path={routeInfo.route}
            component={<RoutePageComponentDefinition/>}
        />;
    };

    return (
        <Router>
            <Row style={{minHeight: '100vh'}}>
                <Sidebar/>
                <Col className={'main-content'}>
                    <Switch>
                        <Route exact path='/'>
                            <HomePage/>
                        </Route>
                        {
                            Object.keys(ROUTES).map(toProtectedRoute)
                        }
                    </Switch>
                </Col>
            </Row>
        </Router>
    );
}

export default App;

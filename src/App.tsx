import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Submissions} from './Pages/Submissions';
import {IncompleteApplications} from './Pages/IncompleteApplications';
import './static/css/sidebar.css';
import {useAuth0} from './react-auth0-spa';
import ProtectedRoute from './Components/ProtectedRoute';
import Sidebar from './Components/Sidebar/Sidebar';
import OriginalSongCompetition from './Pages/OriginalSongCompetition';
import './App.scss';
import {Col, Row} from "reactstrap";
import OriginalSongCompetitionSchedulePage from "./Pages/OriginalSongCompetitionSchedulePage";
import OriginalSongResults from "./Pages/OriginalSongResults";
import HomePage from "./Pages/HomePage";

function App() {
    const {isAuthenticated, isInitializing} = useAuth0();

    if (isInitializing) {
        return null;
    }

    return (
        <Router>
            <Row style={{minHeight: '100vh'}}>
                <Sidebar/>
                <Col className={'main-content'}>
                    <Switch>
                        <Route exact path='/'>
                            <HomePage/>
                        </Route>
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            path="/completedSubmissions"
                            component={<Submissions/>}
                        />
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            path='/incompleteApplications'
                            component={<IncompleteApplications/>}
                        />
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            path='/originalSong'
                            component={<OriginalSongCompetition/>}
                        />
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            path='/bjmf145auth'
                            component={<OriginalSongCompetitionSchedulePage/>}
                        />
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            path='/bjmf145results'
                            component={<OriginalSongResults/>}
                        />
                    </Switch>
                </Col>
            </Row>
        </Router>
    );
}

export default App;

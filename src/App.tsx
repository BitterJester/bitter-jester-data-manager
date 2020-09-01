import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Submissions} from './Pages/Submissions/Submissions';
import {IncompleteApplications} from './Pages/Submissions/IncompleteApplications';
import './static/css/sidebar.css';
import {useAuth0} from './react-auth0-spa';
import ProtectedRoute from './Components/ProtectedRoute';
import Sidebar from './Components/Sidebar';
import OriginalSongCompetition from './Pages/OriginalSongCompetition';
import './App.scss';
import {Card, Col, Row} from "reactstrap";
import {Title} from "./Components/Title";
import OriginalSongCompetitionSchedulePage from "./Pages/OriginalSongCompetitionSchedulePage";
import OriginalSongResults from "./OriginalSongResults";

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
                            <div style={{background: 'rgb(232, 231, 228)'}}
                                 className={'original-song-competition-container'}>
                                <div style={{textAlign: "center", padding: '16px'}}
                                     className={'original-song-container'}>
                                    <Card>
                                        <Title titleDisplayText={'WELCOME TO THE BITTER JESTER DATA MANAGER'}/>
                                        {isAuthenticated ?
                                            'If you are a judge, please go to the Original Song Submissions tab.' :
                                            'Please log in to gain access to the rest of the site.'}
                                    </Card>
                                </div>
                            </div>
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

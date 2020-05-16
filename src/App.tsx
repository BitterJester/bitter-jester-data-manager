import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Submissions} from './Pages/Submissions/Submissions';
import {IncompleteApplications} from './Pages/Submissions/IncompleteApplications';
import './static/sidebar.css';
import {useAuth0} from './react-auth0-spa';
import ProtectedRoute from './Components/ProtectedRoute';
import Sidebar from './Components/Sidebar';
import OriginalSongCompetition from './Pages/OriginalSongCompetition';
import './App.scss';

function App() {
  const {isAuthenticated, isInitializing} = useAuth0();

  if (isInitializing) {
    return null;
  }

  return (
    <Router>
      <Sidebar />
      <div id={'content'} className={'content'}>
        <Switch>
          <Route exact path='/'>
            {isAuthenticated ? 'Please click on the Bitter Jester logo to get access to the rest of the site' : 'Please click on the Bitter Jester logo to get access to login button.'}
          </Route>
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            path="/completedSubmissions"
            component={<Submissions />}
          />
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            path='/incompleteApplications'
            component={<IncompleteApplications />}
          />
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            path='/originalSong'
            component={<OriginalSongCompetition />}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default App;

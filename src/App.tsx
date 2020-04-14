
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Submissions } from './Pages/Submissions/Submissions';
import { IncompleteApplications } from './Pages/Submissions/IncompleteApplications';
import './static/sidebar.css';
import { Sidebar } from './Components/Sidebar';
import { useAuth0 } from './react-auth0-spa';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const { isAuthenticated, isInitializing } = useAuth0();

  useEffect(() => {
    if(isInitializing){
      return;
    }
  }, [isInitializing]);
  console.log(isInitializing);
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
        </Switch>
      </div>
    </Router>
  )
}

export default App;

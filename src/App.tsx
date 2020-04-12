
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Submissions } from './Pages/Submissions/Submissions';
import { IncompleteApplications } from './Pages/Submissions/IncompleteApplications';
import './static/sidebar.css';
import { Sidebar } from './Components/Sidebar';
import { useAuth0 } from './react-auth0-spa';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <Sidebar />
      <div id={'content'} className={'content'}>
        <Switch>
          <Route exact path='/'>
            Hi
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

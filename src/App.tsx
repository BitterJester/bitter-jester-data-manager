import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Submissions } from './Pages/Submissions/Submissions';
import { IncompleteApplications } from './Pages/Submissions/IncompleteApplications';
import './static/sidebar.css';
import { Sidebar } from './Components/Sidebar';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {

  return (
    <Router>
      <Sidebar />
      <div id={'content'} className={'content'}>
        <Switch>
          <ProtectedRoute component={<Submissions />} path="/completedSubmissions"/>
          <Route path="/incompleteApplications">
            <IncompleteApplications />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;

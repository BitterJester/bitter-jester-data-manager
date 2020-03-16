import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Submissions } from './Pages/Submissions/Submissions';
import { IncompleteApplications } from './Pages/Submissions/IncompleteApplications';
import './static/sidebar.css';
import { Button } from 'reactstrap';

function App() {
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  return (
    <Router>
      <Button onClick={() => openNav()}>Menu</Button>
      <div id='mySidenav' className={'sidenav'}>
        <a href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>&times;</a>
        <a href='/completedSubmissions' >Completed Submissions</a>
        <a href='/incompleteApplications' >Incomplete Applications</a>
      </div>
      <div className={'content'}>
        <Switch>
          <Route path="/completedSubmissions">
            <Submissions />
          </Route>
          <Route path="/incompleteApplications">
            <IncompleteApplications />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;

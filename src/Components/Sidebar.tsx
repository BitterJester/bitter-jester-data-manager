import React from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { Button } from 'reactstrap';

export const Sidebar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    console.log(`isAuthenticated: ${isAuthenticated}`);
    return (
        <div>
            <div id='homeLogo' className={'openSidebarComponent'}>
                <img src={require('../static/bj15ylogo.png')} alt='BJ15Years' onClick={() => openNav()} />
            </div>
            <div id='mySidenav' className={'sidenav'}>
                <span className="closebtn" onClick={() => closeNav()}>&times;</span>
                <a href='/completedSubmissions' >Completed Submissions</a>
                <a href='/incompleteApplications' >Incomplete Applications</a>
                {!isAuthenticated && (
                    <Button onClick={() => loginWithRedirect({})}>Log In</Button>
                )}
                {isAuthenticated && <Button onClick={() => logout()}>Log Out</Button>}
            </div>
        </div>
    );
};
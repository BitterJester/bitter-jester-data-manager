import React from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { withRouter, RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {

}

const Sidebar = (props: Props) => {
    const domain = window.location.href.split('/')[2];
    const protocol = window.location.protocol;
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    const getURI = (path: string) => {
        const fullDomain = `${protocol}//${domain}`;

        return `${fullDomain}${path}`
    }

    const redirect = (path: string) => {
        props.history.push(path);
    }

    const getAuthenticationButtonText = () => {
        return isAuthenticated ? 'Log Out' : 'Log In';
    }

    const loginOnClick = () => {
        loginWithRedirect({redirect_uri: getURI('/completedSubmissions')});
    }

    const authenticate = isAuthenticated ?
        () => logout({returnTo: getURI('/')}) :
        loginOnClick;

    return (
        <div>
            <div id='homeLogo' className={'openSidebarComponent'}>
                <img src={require('../static/bj15ylogo.png')} alt='BJ15Years' onClick={() => openNav()} />
            </div>
            <div id='mySidenav' className={'sidenav'}>
                <span className="closebtn" onClick={() => closeNav()}>&times;</span>
                <button className={'sidenavButton'} onClick={() => redirect('/completedSubmissions')} >Completed Submissions</button>
                <button className={'sidenavButton'} onClick={() => redirect('/incompleteApplications')} >Incomplete Applications</button>
                <button className={'sidenavButton'} onClick={authenticate}>{getAuthenticationButtonText()}</button>
            </div>
        </div>
    );
};

export default withRouter(Sidebar);
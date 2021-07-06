import React, {useState} from 'react';
import {useAuth0} from '../../react-auth0-spa';
import {RouteComponentProps, withRouter} from 'react-router';
import {Col, Dropdown} from "reactstrap";

interface Props extends RouteComponentProps {

}

const HOME_PATH = '/';
const COMPLETED_SUBMISSIONS_PATH = '/completedSubmissions';
const UPLOADED_FILES_PATH = '/uploadedFiles';
const INCOMPLETE_APPLICATIONS_PATH = '/incompleteApplications';
const Sidebar = (props: Props) => {
    const domain = window.location.href.split('/')[2];
    const protocol = window.location.protocol;
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    const getURI = (path: string) => {
        const fullDomain = `${protocol}//${domain}`;
        return `${fullDomain}${path}`
    }

    const redirect = (path: string) => {
        const queryParams = window.location.search;
        props.history.push(`${path}${queryParams}`);
    }

    const getAuthenticationButtonText = () => {
        return isAuthenticated ? 'Log Out' : 'Log In';
    }

    const loginOnClick = async () => {
        await loginWithRedirect({redirect_uri: getURI('/'), appState: props.history});
    }

    const logoutOnClick = () => logout({returnTo: getURI('/')});

    const authenticate = isAuthenticated ? logoutOnClick : loginOnClick;
    const logoUrl = window.location.pathname === '/originalSong' ?
        require('../../static/images/bj-14-5-logo.png') :
        require('../../static/images/bj15ylogo.png');
    const notOnHomePage = window.location.pathname !== HOME_PATH;
    return (
        <Col className={'sidebar-container'}>
            <div className={'sidebar-logo'}>
                <img height={200} src={logoUrl} alt='BJ15Years'/>
            </div>
            <div className={'sidebar'}>
                {notOnHomePage && <button className={'sidebar-button'} onClick={() => redirect(HOME_PATH)}>Home</button>}
                {notOnHomePage && window.location.pathname  !== COMPLETED_SUBMISSIONS_PATH && <button className={'sidebar-button'} onClick={() => redirect(COMPLETED_SUBMISSIONS_PATH)}>Completed Submissions</button>}
                {notOnHomePage && window.location.pathname !== UPLOADED_FILES_PATH && <button className={'sidebar-button'} onClick={() => redirect(UPLOADED_FILES_PATH)}>Uploaded Files</button>}
                {notOnHomePage && window.location.pathname !== INCOMPLETE_APPLICATIONS_PATH && <button className={'sidebar-button'} onClick={() => redirect(INCOMPLETE_APPLICATIONS_PATH)}>Incomplete Applications</button>}
                <button className={'sidebar-button'} onClick={authenticate}>{getAuthenticationButtonText()}</button>
            </div>
        </Col>
    );
};

export default withRouter(Sidebar);
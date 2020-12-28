import React, {useState} from 'react';
import {useAuth0} from '../../react-auth0-spa';
import {RouteComponentProps, withRouter} from 'react-router';
import {Col, Dropdown} from "reactstrap";

interface Props extends RouteComponentProps {

}

const Sidebar = (props: Props) => {
    const domain = window.location.href.split('/')[2];
    const protocol = window.location.protocol;
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();
    const [selectedCompetitions, updateSelectedCompetitions] = useState([]);

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

    const loginOnClick = async () => {
        await loginWithRedirect({redirect_uri: getURI('/'), appState: props.history});
    }

    const logoutOnClick = () => logout({returnTo: getURI('/')});

    const authenticate = isAuthenticated ? logoutOnClick : loginOnClick;
    const logoUrl = window.location.pathname === '/originalSong' ?
        require('../../static/images/bj-14-5-logo.png') :
        require('../../static/images/bj15ylogo.png');
    return (
        <Col className={'sidebar-container'}>
            <div className={'sidebar-logo'}>
                <img height={200} src={logoUrl} alt='BJ15Years'/>
            </div>
            <div className={'sidebar'}>
                <button className={'sidebar-button'} onClick={() => redirect('/')}>Home</button>
                <button className={'sidebar-button'} onClick={authenticate}>{getAuthenticationButtonText()}</button>
            </div>
        </Col>
    );
};

export default withRouter(Sidebar);
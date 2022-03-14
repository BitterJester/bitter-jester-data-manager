import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {Col} from "reactstrap";
import {AmplifySignOut} from '@aws-amplify/ui-react';
import {toast} from "react-toastify";

interface Props extends RouteComponentProps {

}

const HOME_PATH = '/';
const COMPLETED_SUBMISSIONS_PATH = '/completedSubmissions';
const UPLOADED_FILES_PATH = '/uploadedFiles';
const INCOMPLETE_APPLICATIONS_PATH = '/incompleteApplications';
const Sidebar = (props: Props) => {
    const redirect = (path: string, requiredQueryParams = [], errorMessage = '') => {
        const queryParams = window.location.search;
        let isValid = true;
        for (const requiredParam of requiredQueryParams) {
            if (!queryParams.includes(requiredParam)) {
                toast.error(errorMessage);
                isValid = false;
            }
        }
        if (isValid) {
            props.history.push(`${path}${queryParams}`);
        }
    }

    const logoUrl = window.location.pathname === '/originalSong' ?
        require('../../static/images/bj-14-5-logo.png') :
        require('../../static/images/bj15ylogo.png');
    const errorMessage = `You must have a competition selected to navigate to this page.`;
    return (
        <Col className={'sidebar-container'}>
            <div className={'sidebar-logo'}>
                <img height={200} src={logoUrl} alt='BJ15Years'/>
            </div>
            <div className={'sidebar'}>
                <button className={'sidebar-button'} onClick={() => redirect(HOME_PATH)}>Home</button>
                <button className={'sidebar-button'}
                        onClick={() => redirect(COMPLETED_SUBMISSIONS_PATH, ['competitionId'], errorMessage)}>Completed
                    Submissions
                </button>
                <button className={'sidebar-button'}
                        onClick={() => redirect(UPLOADED_FILES_PATH, ['competitionId'], errorMessage)}>Uploaded Files
                </button>
                <button className={'sidebar-button'}
                        onClick={() => redirect(INCOMPLETE_APPLICATIONS_PATH, ['competitionId'], errorMessage)}>Incomplete
                    Applications
                </button>
                <AmplifySignOut/>
            </div>
        </Col>
    );
};

export default withRouter(Sidebar);
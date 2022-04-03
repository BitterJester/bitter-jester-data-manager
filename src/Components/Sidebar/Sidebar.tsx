import React, {Fragment} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {Button, Col} from "reactstrap";
import {AmplifySignOut} from '@aws-amplify/ui-react';
import {toast} from "react-toastify";
import CompetitionSelectionDropDown from "./CompetitionSelectionDropDown";
import {useSelector} from "react-redux";
import {DataManagerReduxStore} from "../../redux/data-manager-redux-store";
import {UrlHelper} from "../../utils/url-helper";
import {Card} from "@material-ui/core";
import {ROUTES} from "../../static/constants/routes";

interface Props extends RouteComponentProps {

}

const HOME_PATH = '/';
const COMPLETED_SUBMISSIONS_PATH = '/completedSubmissions';
const UPLOADED_FILES_PATH = '/uploadedFiles';
const INCOMPLETE_APPLICATIONS_PATH = '/incompleteApplications';
const RESULT_PATH = '/bjmf145results';
const CREATE_COMPETITION_PATH = '/createCompetition';

const Sidebar = (props: Props) => {
    const {selectedCompetition} = useSelector((state: DataManagerReduxStore) => {
        return ({selectedCompetition: state.selectedCompetition});
    });
    const redirect = (path: string, requiresCompetition = false) => {

        if (path !== HOME_PATH && selectedCompetition.id === '' && requiresCompetition) {
            toast.error(errorMessage)
        } else {
            props.history.push(path);
        }
    }

    const logoUrl = window.location.pathname === '/originalSong' ?
        require('../../static/images/bj-14-5-logo.png') :
        require('../../static/images/bj15ylogo.png');
    const errorMessage = `You must have a competition selected to navigate to this page.`;

    function withCompetitionIdQueryParam(path: string) {
        return `${path}?competitionId=${selectedCompetition.id}`;
    }

    const {history} = props;

    const urlHelper = new UrlHelper(history);
    return (
        <div className={'sidebar-container'}>
            <div className={'sidebar-logo'}>
                <img height={200} src={logoUrl} alt='BJ15Years'/>
            </div>
            <div>
                <CompetitionSelectionDropDown/>
            </div>
            <div className={'sidebar'}>
                <Card className={'action-card'}>
                    <button className={'sidebar-button'} onClick={() => redirect(HOME_PATH)}>Home</button>
                    <button className={'sidebar-button'} onClick={() => redirect(CREATE_COMPETITION_PATH)}>Create
                        Competition
                    </button>
                    {selectedCompetition.type === 'online' && <Fragment>
                        <button
                            className={'sidebar-button'}
                            onClick={() => redirect(withCompetitionIdQueryParam(ROUTES.originalSongCompetition.route), true)}>
                            Original Song Competition
                        </button>
                        <button
                            className={'sidebar-button'}
                            onClick={() => redirect(withCompetitionIdQueryParam(ROUTES.fridayNightScheduler.route), true)}>
                            OSC Scheduler
                        </button>
                        <button
                            className={'sidebar-button'}
                            onClick={() => redirect(withCompetitionIdQueryParam(ROUTES.originalSongResults.route), true)}>
                            OSC Results
                        </button>
                    </Fragment>
                    }
                    <button className={'sidebar-button'}
                            onClick={() => redirect(withCompetitionIdQueryParam(COMPLETED_SUBMISSIONS_PATH), true)}>Complete
                        Submissions
                    </button>
                    <button className={'sidebar-button'}
                            onClick={() => redirect(withCompetitionIdQueryParam(INCOMPLETE_APPLICATIONS_PATH), true)}>Incomplete
                        Submissions
                    </button>
                    <button className={'sidebar-button'}
                            onClick={() => redirect(withCompetitionIdQueryParam(UPLOADED_FILES_PATH), true)}>Uploaded Files
                    </button>
                    <button className={'sidebar-button'}
                            onClick={() => redirect(withCompetitionIdQueryParam(RESULT_PATH), true)}>
                        Results
                    </button>
                    <AmplifySignOut/>
                </Card>
            </div>
        </div>
    );
};

export default withRouter(Sidebar);
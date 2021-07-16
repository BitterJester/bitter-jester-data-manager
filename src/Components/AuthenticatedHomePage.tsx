import React, {useEffect} from "react";
import CompetitionSelectionDropDown from "./Sidebar/CompetitionSelectionDropDown";
import {Button} from "reactstrap";
import {withRouter} from "react-router";
import {AdminHomePageView} from "./AdminHomePageView";
import {UrlHelper} from "../utils/url-helper";
import dataManagerReduxStore, {DataManagerReduxStore} from "../redux/data-manager-redux-store";
import {useSelector} from "react-redux";
import {useAuth0} from "../react-auth0-spa";
import BitterJesterApiRequest, {API_URL_PATHS} from "../utils/bitter-jester-api-request";

const AuthenticatedHomePage = (props) => {
    const {user} = useAuth0();
    const isAdmin = user.email.split('@')[1] === 'bitterjester.com';
    const fetch = async () => {
        const competitions = await BitterJesterApiRequest.get(API_URL_PATHS.COMPETITIONS, false) as {competitions: {type: string}[]};
        const filteredCompetitions = competitions.competitions.filter(comp => comp.type === 'online');
        return dataManagerReduxStore.dispatch({type: 'competitions/set', payload: {competitions: isAdmin ? competitions.competitions : filteredCompetitions}});
    }

    useEffect(() => {
        fetch();
    }, []);

    const {selectedCompetition} = useSelector((state: DataManagerReduxStore) => ({selectedCompetition: state.selectedCompetition}))

    const areButtonsDisabled = selectedCompetition.id === '';

    const urlHelper = new UrlHelper(props.history);

    return <>
        <div>
            Please select the competition you are judging for and navigate to the Original Song Competition page.
        </div>
        <div className={""}>
            <CompetitionSelectionDropDown/>
        </div>
        <div className={"public-route-buttons"}>
            {selectedCompetition.type === 'online' && <Button
                className='home-route-button'
                onClick={() => urlHelper.redirectToOriginalSongCompetition(selectedCompetition.id)}
                disabled={areButtonsDisabled}>
                Original Song Competition
            </Button>}
        </div>
        <AdminHomePageView disabled={areButtonsDisabled}/>
    </>;
};

export default withRouter(AuthenticatedHomePage);
import React, {useEffect} from "react";
import CompetitionSelectionDropDown from "./Sidebar/CompetitionSelectionDropDown";
import {Button} from "reactstrap";
import {withRouter} from "react-router";
import {AdminHomePageView} from "./AdminHomePageView";
import {UrlHelper} from "../utils/url-helper";
import {getFromS3} from "../aws/getFromS3";
import dataManagerReduxStore, {DataManagerReduxStore} from "../redux/data-manager-redux-store";
import {useSelector} from "react-redux";

const AuthenticatedHomePage = (props) => {
    const fetch = async () => {
        getFromS3('all-competitions.json', (competitions) => {
            return dataManagerReduxStore.dispatch({type: 'competitions/set', payload: {competitions: competitions.competitions}});
        }, true);
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
        <AdminHomePageView
            disabled={areButtonsDisabled}
            selectedCompetition={selectedCompetition}
        />
    </>;
};

export default withRouter(AuthenticatedHomePage);
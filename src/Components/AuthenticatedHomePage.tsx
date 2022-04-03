import React, {useEffect} from "react";
import CompetitionSelectionDropDown from "./Sidebar/CompetitionSelectionDropDown";
import {Button} from "reactstrap";
import {withRouter} from "react-router";
import {AdminHomePageView} from "./AdminHomePageView";
import {UrlHelper} from "../utils/url-helper";
import dataManagerReduxStore, {DataManagerReduxStore} from "../redux/data-manager-redux-store";
import {useSelector} from "react-redux";
import {BitterJesterApiCompetitionsRequest} from "../utils/api-requests/bitter-jester-api-competitions-request";

const AuthenticatedHomePage = (props) => {
    const {selectedCompetition} = useSelector((state: DataManagerReduxStore) => ({selectedCompetition: state.selectedCompetition}))

    const areButtonsDisabled = selectedCompetition.id === '';

    const urlHelper = new UrlHelper(props.history);

    return <>
        <div>
            There is nothing to put here anymore for now... we can figure this out later.
        </div>
    </>;
};

export default withRouter(AuthenticatedHomePage);
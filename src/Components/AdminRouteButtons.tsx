import {Button} from "reactstrap";
import React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {CompetitionDropDownOption} from "./Sidebar/CompetitionSelectionDropDown";
import {UrlHelper} from "../utils/url-helper";

interface Props extends RouteComponentProps {
    selectedCompetition: CompetitionDropDownOption;
    disabled: boolean;
}

function AdminRouteButtons(props: Props) {
    const {history, selectedCompetition} = props;

    const urlHelper = new UrlHelper(history);

    return (<div className={"admin-route-buttons"}>
        <Button
            className={" home-route-button"}
            onClick={() => urlHelper.redirectToCreateACompetition()}>
            Create a Competition
        </Button>
        <Button
            className={" home-route-button"}
            disabled={props.disabled}
            onClick={() => urlHelper.redirectToCompletedSubmissions(selectedCompetition.id)}>
            Completed Submissions
        </Button>
        <Button
            className={"home-route-button"}
            disabled={props.disabled}
            onClick={() => urlHelper.redirectToIncompleteApplications(selectedCompetition.id)}>
            Incomplete Applications
        </Button>
        <Button
            className={"home-route-button"}
            disabled={props.disabled}
            onClick={() => urlHelper.redirectToSchedulePage(selectedCompetition.id)}>
            Friday Night Scheduler
        </Button>
        <Button
            className={"home-route-button"}
            disabled={props.disabled}
            onClick={() => urlHelper.redirectToResults(selectedCompetition.id)}>
            Results
        </Button>
    </div>);
}

export default withRouter(AdminRouteButtons);
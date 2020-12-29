import {Button} from "reactstrap";
import React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {Competition} from "./Sidebar/CompetitionSelectionDropDown";

interface Props extends RouteComponentProps {
    selectedCompetition: Competition;
    disabled: boolean;
}

function AdminRouteButtons(props: Props) {
    const redirect = (path: string) => {
        props.history.push(path);
    };

    const getRedirectWithCompetitionQueryParam = (path) => {
        return () => redirect(`/${path}?competition=${props.selectedCompetition.id}`);
    }

    return (<div className={"admin-route-buttons"}>
        <Button
            className={" home-route-button"}
            disabled={props.disabled}
            onClick={getRedirectWithCompetitionQueryParam('/completedSubmissions')}>
            Completed Submissions
        </Button>
        <Button
            className={"home-route-button"}
            disabled={props.disabled}
            onClick={getRedirectWithCompetitionQueryParam('/incompleteApplications')}>
            Incomplete Applications
        </Button>
        <Button
            className={"home-route-button"}
            disabled={props.disabled}
            onClick={getRedirectWithCompetitionQueryParam('/bjmf145results')}>
            Results
        </Button>
        <Button
            className={"home-route-button"}
            disabled={props.disabled}
            onClick={getRedirectWithCompetitionQueryParam('/bjmf145auth')}>
            Friday Night Scheduler
        </Button>
    </div>);
}

export default withRouter(AdminRouteButtons);